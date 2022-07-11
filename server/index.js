import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import mainRoute from './routes/main.js'

const app=express();
app.use(cors());
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))

app.use('/',mainRoute)
app.use('/posts',postRoutes)
app.use('/users',userRoutes)
const PORT=process.env.PORT||5000;
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server is running at port ${PORT}`)))
.catch((error)=>{console.log(error.message)})
// mongoose.set('useFindAndModify',false)