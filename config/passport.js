import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { validatePassword } from '../utils/passwordUtils.js';
import { connection } from '../db/database.js';

const members = connection.model.members;

export default passport.use(
  new LocalStrategy((username, password, cb) => {
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
    members
      .findOne({ username: username })
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

// const strategy = new LocalStrategy(verify());

// passport.use(strategy);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((userId, cb) => {
  users.findById(userId).then((user) => {
    cb(null, user);
  });
});
