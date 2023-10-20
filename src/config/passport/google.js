import { Strategy } from 'passport-google-oauth20';
import { v4 as uuidv4 } from 'uuid';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../env';
import { AUTH_TYPE } from '../constants';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';

const opts = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/v1/google/callback',
};

export default function (passport) {
  passport.use(
    new Strategy(opts, async function (_accessToken, _refreshToken, profile, done) {
      try {
        const info = profile._json;

        const filter = {
          $or: [{ googleId: info.sub }, { email: info.email }],
        };

        const userExisting = await User.exists(filter);

        const condition = userExisting
          ? {
              googleId: info.sub,
            }
          : {
              userName: info.email.split('@')[0] + uuidv4(),
              email: info.email,
              avatar: info.picture,
              googleId: info.sub,
              fullName: info.name,
              authType: AUTH_TYPE.SOCIAL,
            };

        const user = await User.findOneAndUpdate(filter, condition, { upsert: true, new: true });

        await UserProfile.findOneAndUpdate({ user: user._id }, {}, { upsert: true });

        done(null, { ...user.toResource() });
      } catch (error) {
        done(error, null);
      }
    })
  );
}
