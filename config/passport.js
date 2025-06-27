import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { validatePassword } from '../utils/passwordUtils.js';
import { Members } from '../db/database.js';

export default passport.use(
  new LocalStrategy((username, password, cb) => {
    Members.findOne({ username: username })
      .then((user) => {
        if (!user) {
          return cb(null, false);
        }

        const isValid = validatePassword(password, user.hash, user.salt);

        if (isValid) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
      })
      .catch((err) => {
        cb(err);
      });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((userId, cb) => {
  try {
    Members.findById(userId).then((user) => {
      cb(null, user);
    });
  } catch (err) {
    cb(err, null);
  }
});
