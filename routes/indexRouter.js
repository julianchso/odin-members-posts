import passport from 'passport';

import { Router } from 'express';
import indexController from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', indexController.homeGet);
indexRouter.get('/register', indexController.registerGet);
indexRouter.get('/login', indexController.loginGet);

indexRouter.post('/register', indexController.registerPost);

// indexRouter.post('/login', indexController.loginPost);
indexRouter.post('/login', passport.authenticate('local'), (req, res) => {
  // console.log(res);
  // console.log('authenticated!');
});

export default indexRouter;
