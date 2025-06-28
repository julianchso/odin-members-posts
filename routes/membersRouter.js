import { Router } from 'express';
import membersController from '../controllers/membersController.js';

const membersRouter = Router();

membersRouter.get('/all', membersController.allMembersGet);
membersRouter.get('/membership', membersController.membershipGet);

membersRouter.post('/membership', membersController.membershipPost);

export default membersRouter;
