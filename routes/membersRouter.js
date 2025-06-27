import { Router } from 'express';
import membersController from '../controllers/membersController.js';

const membersRouter = Router();

membersRouter.get('/all', membersController.allMembersGet);

export default membersRouter;
