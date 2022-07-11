import jwt from 'jsonwebtoken'
import {createError} from '../utils/error.js'
export const verifyToken=(req,res,next)=>{
    // console.log("entered v token");
    const token=req.cookies.access_token;
    // console.log(token);
    if(!token){
        return next(createError(401,"you are not authenticated"))
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            return next(createError(403,"your token is not valid"))
        }
        req.user=user;
        next()
    }) 
}
export const verifyUser=(req,res,next)=>{
    // console.log("entered v user");
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id ||req.user.isAdmin ){
            next()
        }else{
         return next(createError(403,"you are not authorised"))
        }
    })
}
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next()
        }else{
         return next(createError(403,"you are not authorised"))
        }
    })
}