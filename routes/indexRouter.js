import { Router } from 'express';
import indexController from '../controllers/indexController.js';
import passport from 'passport';

const indexRouter = Router();

indexRouter.get('/', indexController.homeGet);
indexRouter.get('/register', indexController.registerGet);
indexRouter.get('/login', indexController.loginGet);

indexRouter.post('/register', indexController.registerPost);

indexRouter.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

export default indexRouter;
