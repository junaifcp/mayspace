import mongoose from "mongoose";
const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    photo:{
        type:String
    },
    id:{
        type:String
    },
    username:{
        type:String
    },
    email:{
        type:String
    }
},{timestamps:true})
export default mongoose.model("Post",PostSchema)