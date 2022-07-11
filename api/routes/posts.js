import express from 'express'
import { createPost, deletePost, getAllPost, getPost, updatePost } from '../controllers/post.js';
import Post from '../models/post.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router =express.Router();

//CREATE
router.post('/',createPost)
//UPDATE
router.put('/:id',verifyAdmin,updatePost)
//DELETE
router.delete('/:id',verifyAdmin,deletePost)
//GET ONE
router.get('/:id',getPost)
//GET ALL
router.get('/',getAllPost)
export default router;