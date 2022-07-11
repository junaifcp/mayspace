import express from 'express';
const router=express.Router();
import {getUsers,createUser} from '../controllers/userController.js'
router.get('/:token', getUsers)
router.post('/', createUser)


export default router;