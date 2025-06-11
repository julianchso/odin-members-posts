import { Router } from 'express';
import indexController from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', indexController.homeGet);
indexRouter.get('/register', indexController.registerGet);
indexRouter.get('/login', indexController.loginGet);

export default indexRouter;
