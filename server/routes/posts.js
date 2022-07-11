import express from 'express';
const router=express.Router();
import {getPosts,createPosts} from '../controllers/postController.js'
router.get('/', getPosts)
router.get('/', createPosts)


export default router;