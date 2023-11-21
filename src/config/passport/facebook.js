import { Strategy } from 'passport-facebook';
import { v4 as uuidv4 } from 'uuid';
import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } from '../env';
import { AUTH_TYPE } from '../constants';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';

const opts = {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: '/api/v1/facebook/callback',
};

export default function (passport) {
  passport.use(
    new Strategy(opts, async function (_accessToken, _refreshToken, profile, done) {
      try {
        const info = profile._json;

        const filter = {
          $or: [{ facebookId: info.sub }, { email: info.email }],
        };

        const userExisting = await User.exists(filter);

        const condition = userExisting
          ? {
              facebookId: info.sub,
            }
          : {
              userName: info.email.split('@')[0] + uuidv4().split('-')[0],
              email: info.email,
              avatar: info.picture,
              facebookId: info.sub,
              fullName: info.name,
              authType: AUTH_TYPE.SOCIAL,
            };

        const user = await User.findOneAndUpdate(filter, condition, { upsert: true, new: true });

        await UserProfile.findOneAndUpdate({ user: user._id }, {}, { upsert: true });

        done(null, { ...user.toResource(), token: user.generateJWT() });
      } catch (error) {
        done(error, null);
      }
    })
  );
}
