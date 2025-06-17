import passport from 'passport';

import { genPassword } from '../utils/passwordUtils.js';
import { User } from '../db/database.js';

const homeGet = (req, res) => {
  res.render('home', {
    title: 'Home',
  });
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

  const newUser = new User({
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

export default { homeGet, registerGet, registerPost, loginGet, loginPost };
