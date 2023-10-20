import passportJwt from './local';
import passportGoogle from './google';
import passportFacebook from './facebook';
import passportGithub from './github';

export default function setupPassport(passport) {
  passportJwt(passport);
  passportGoogle(passport);
  passportFacebook(passport);
  passportGithub(passport);

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
}
