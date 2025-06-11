import { Router } from 'express';
import { newPostGet } from '../controllers/postsController.js';

const messageRouter = Router();

messageRouter.get('/newPost', newPostGet);
