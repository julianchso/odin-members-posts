import { Router } from 'express';
import postsController from '../controllers/postsController.js';

const postRouter = Router();

postRouter.get('/', postsController.postsGet);
postRouter.get('/newPost', postsController.newPostGet);

postRouter.post('/newPost', postsController.newPostPost);

export default postRouter;
