import passportJwt from './local';

export default function setupPassport(passport) {
  passportJwt(passport);

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
}
