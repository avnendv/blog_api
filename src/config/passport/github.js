import { Strategy } from 'passport-github2';
import { v4 as uuidv4 } from 'uuid';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../env';
import { AUTH_TYPE } from '../constants';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';

const opts = {
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: '/api/v1/github/callback',
};

export default function (passport) {
  passport.use(
    new Strategy(opts, async function (_accessToken, _refreshToken, profile, done) {
      try {
        const info = profile._json;

        const filter = {
          $or: [{ githubId: info.sub ?? '' }, { email: info.email }],
        };

        const userExisting = await User.exists(filter);
        const uuid = uuidv4().split('-')[0];

        const condition = userExisting
          ? {
              githubId: info.sub,
            }
          : {
              userName: info.login ? String(info.login.split('@')[0] + uuid) : String(uuid),
              email: info.email || String(uuid),
              avatar: info.avatar_url,
              githubId: info.sub,
              fullName: info.name || String(uuid),
              authType: AUTH_TYPE.SOCIAL,
            };
        const user = await User.findOneAndUpdate(filter, condition, { upsert: true, new: true });

        await UserProfile.findOneAndUpdate(
          { user: user._id },
          {
            githubUrl: info.html_url,
          },
          { upsert: true }
        );

        done(null, { ...user.toResource(), token: user.generateJWT() });
      } catch (error) {
        done(error, null);
      }
    })
  );
}
