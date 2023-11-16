import { Strategy } from 'passport-jwt';
import { TOKEN_SECRET } from '../env';
import User from '@/models/User';
import ApiError from '@/utils/ApiError';

const cookieExtractor = function (req) {
  return req.token;
};
const opts = { secretOrKey: TOKEN_SECRET, jwtFromRequest: cookieExtractor };

export default function (passport) {
  passport.use(
    new Strategy(opts, async function (jwtPayload, done) {
      try {
        const user = await User.findById(jwtPayload._id);
        if (!user) throw new ApiError('User not found');

        done(null, { ...user.toResource() });
      } catch (error) {
        done(error, null);
      }
    })
  );
}
