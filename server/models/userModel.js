import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const UserScheema=new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    cpassword:{
        type:String
    },
    id:{
        type:String
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})
UserScheema.methods.generateToken=async function(){
    try {
        const token=jwt.sign({email:this.email,password:this.password},process.env.SECRET_KEY);
        // await this.save();
        return token;
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}
UserScheema.pre("save", function(next){
    if(this.isModified('password')){

        bcrypt.hash(this.password,8,(err,hash)=>{
            if(err) return next(err)
            console.log(hash);
            this.password=hash;
            next();
        });
    }
})
UserScheema.methods.comparePassword=async function(password){
    if(!password) throw new Error('password is missing')
    try {
        const result=await bcrypt.compare(password,this.password)
        return result;
    } catch (error) {
        console.log('Error while comparing password',error.message);
    }
}
const Users=mongoose.model('Users',UserScheema);
export default Users;

