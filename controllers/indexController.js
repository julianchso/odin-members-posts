import passport from 'passport';

import { genPassword } from '../utils/passwordUtils.js';
import { Members } from '../db/database.js';

const homeGet = (req, res) => {
  if (req.user) {
    res.render('home', {
      title: 'Home',
      user: req.user.username,
    });
  } else {
    res.render('home', {
      title: 'Home',
    });
  }
};

const registerGet = (req, res) => {
  res.render('register'),
    {
      title: 'Register',
    };
};

const registerPost = (req, res, next) => {
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new Members({
    'full-name': req.body['full-name'],
    username: req.body.username,
    hash: hash,
    salt: salt,
    post_id: [],
    'membership-status': false,
    admin: false,
  });

  newUser.save().then((user) => {
    console.log(user);
  });

  res.redirect('/login');
};

const loginGet = (req, res) => {
  res.render('login'),
    {
      title: 'Login',
    };
};

const loginPost = () => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
    (req, res, next) => {
      console.log(res);
    };
};

const logoutPost = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

export default { homeGet, registerGet, registerPost, loginGet, loginPost, logoutPost };
