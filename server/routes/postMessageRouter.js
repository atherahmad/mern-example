import { Router } from 'express';

import { auth } from '../middlewares/verifyToken.js';
import { getPosts, addPost, editPost, removePost, likePost } from '../controllers/postMessageControllers.js';
import Post from '../models/Post.js';

const router = Router();

router.get('/getposts', auth, getPosts);
router.post('/addpost', auth, addPost);
router.put('/editpost/:id', auth, editPost);
router.delete('/removepost/:id', auth, removePost);
router.put('/likepost/:id', auth, likePost);

export default router;