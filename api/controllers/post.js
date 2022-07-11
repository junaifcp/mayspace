import Post from "../models/post.js"

export const createPost=async(req,res,next)=>{
  console.log(req.body);
    const newPost=new Post({
      title:req.body.title,
      type:req.body.type,
      desc:req.body.desc,
      id:req.body._id,
      username:req.body.username,
      email:req.body.email,
    })

    try {
      const savedPost=await newPost.save()
      res.status(200).json(savedPost)
    } catch (error) {
      next(error)
    }
}
export const updatePost=async(req,res,next)=>{
    
    try {
        const updatePost=await Post.findByIdAndUpdate(req.params.id,{    
            $set:req.body
        },{new:true})
        res.status(200).json(updatePost)
      } catch (error) {
        next(error)
      }
}
export const deletePost=async(req,res,next)=>{
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
      } catch (error) {
        next(error)
      }
}
export const getPost=async(req,res,next)=>{
    try {
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
      } catch (error) {
        next(error)
      }
}
export const getAllPost=async(req,res,next)=>{
    try {
        const posts=await Post.find()
        res.status(200).json(posts)
      } catch (error) {
       next(error)
      }
}