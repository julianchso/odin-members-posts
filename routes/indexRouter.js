import passport from 'passport';

import { Router } from 'express';
import indexController from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', indexController.homeGet);
indexRouter.get('/register', indexController.registerGet);
indexRouter.get('/login', indexController.loginGet);

indexRouter.post('/register', indexController.registerPost);

indexRouter.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/register',
    successRedirect: '/',
  })
);

export default indexRouter;
