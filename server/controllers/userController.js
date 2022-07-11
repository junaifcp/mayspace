import Users from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const getUsers=async(req,res)=>{
    try {
        const email=req.params.token;
        console.log(email);
        const userList=await Users.find({email});
        res.status(200).json(userList)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
export const createUser=async(req,res,next)=>{
    const User=req.body;
    console.log(req.body);
    try {
        const newUser=new Users(User)
        const token=await newUser.generateToken();
        // const token=jwt.sign({
        //     name:User.name,
        //     password:User.password
        // },'secretForTheJwt123')
        const register=await newUser.save()
        res.status(201).json({token})
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}
export const loginUser=async(req,res,next)=>{
   
    try {
       const {username,password}=req.body
       console.log(req.body);
       const user=await Users.findOne({email:username})
       const name=user.username;
       const email=user.email;
       if(!user) return res.status(409).json({message:"there is no user exists"})
       const isMatch=await bcrypt.compare(password,user.password) 
       if(!isMatch) return res.status(409).json({message:"password is not matching"})
       else res.status(200).json({message:"Loggin successful",name,email})
       console.log("success");
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}
