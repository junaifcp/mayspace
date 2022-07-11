import express from 'express'
import mongoose from 'mongoose';
import { createUser, deleteUser, getAllUser, getUser, updateUser } from '../controllers/user.js';
import User from '../models/User.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
const router =express.Router();



// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello loged in")
// })
// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send(req.user)
// })
// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send(req.user)
// })
//CREATE
router.post('/',createUser)
//UPDATE
router.put('/:id',updateUser)
//DELETE
router.delete('/:id',deleteUser)
//GET ONE
router.get('/:id',verifyUser,getUser)
//GET ALL
router.get('/',getAllUser)

//BLOCK
router.put('/block/:id',async(req,res,next)=>{
    try {
        // console.log("ryutfgyuitfgiyug");
        const _id=mongoose.Types.ObjectId(req.params.id);
        let status=await User.findOne({_id},{blockStatus:1})
        console.log(status);
        if(status.blockStatus){
            console.log("blocke stats");
            const user=await User.updateOne({_id},{
              $set:{
                blockStatus:false
              }
              
            })
            console.log(user);
            res.status(200).json(user)
          
          }else{
            const user=await User.updateOne({_id},{
              $set:{
                blockStatus:true
              }
            },{upsert:true})
            console.log(user);
            res.status(200).json(user)
           
          }
        // User.findOne({_id: req.params.id }, function(err, user) {
        //     user.blockStatus = !user.blockStatus;
        //     user.save(function(err, blocked) {
        //         console.log(blocked);
        //         res.status(200).json(blocked)
        //     });
        // });


        // console.log('blocked route');
        // console.log(req.params.id);
        // const blocked=await User.findByIdAndUpdate(req.params.id,{
        //     $set:{blockStatus:true}
        // },{new:true})
        // console.log(blocked);
        // res.status(200).json(blocked)
        
    } catch (error) {
        next(error)
    }
})
//unblock
router.put('/unblock/:id',async(req,res,next)=>{
    try {
        console.log('un-blocked route');
        await User.findByIdAndUpdate(req.params.id,{
            $set:{blockStatus:false}
        },{new:true})
        res.status(200).json("user has been un-blocked successfully")
        
    } catch (error) {
        next(error)
    }
})

export default router;