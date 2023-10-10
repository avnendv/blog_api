import { Strategy } from 'passport-jwt';
import { TOKEN_SECRET } from '../env';
import User from '@/models/User';

const cookieExtractor = function (req) {
  return (
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.headers['authorization']?.split(' ')[1] ||
    req.cookies['jwt']
  );
};
const opts = { secretOrKey: TOKEN_SECRET, jwtFromRequest: cookieExtractor };

export default function (passport) {
  passport.use(
    new Strategy(opts, async function (jwtPayload, done) {
      try {
        const user = await User.findById(jwtPayload._id);

        if (!user) throw Error('User not found');

        done(null, { ...user.toAuthJSON() });
      } catch (error) {
        done(error, null);
      }
    })
  );
}
