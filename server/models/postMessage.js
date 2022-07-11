import mongoose from 'mongoose';
const PostScheema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    creator:{
        type:String,
        required:true
    },
    tags:[String],
    selectedFile:String,
    likeCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:new Date()
    }

})

const PostMessage=mongoose.model('PostMessage',PostScheema);
export default PostMessage;

