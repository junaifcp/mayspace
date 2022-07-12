import {Card,CardHeader,Avatar,IconButton,CardMedia,CardContent,CardActions,Typography, Grid } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import React,{useEffect, useState} from 'react'
import axios from 'axios';
import useFetch from '../../hooks/useFetch';

function Feed() {
  const {data,loading,error}=useFetch("http://localhost:5001/api/posts")
  console.log(data);
  const [posts,setPosts]=useState([])
  // useEffect(() => {
  //   axios.get("http://localhost:5001/api/posts")
  //   .then((res)=>{
  //      setPosts(res.data)
  //      console.log(posts);
  //   })
  // },[])
  
  return (
    <Grid  flex={4} p={2} sx={{display:'flex'}}>
      {loading?("loading please wait"):(<>
    {data.map((img,i)=>(

      <Card sx={{ maxWidth: 345,maxHeight:345}} key={i} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor:'red' }} aria-label="recipe">
            {data[i]?.username[0]}
          </Avatar>
        }
        title={data[i]?.username}
        subheader={data[i]?.createdAt.slice(0,10)}
        />
      <CardContent>
        <Typography variant="h5"  color="text.secondary">
          {data[i]?.title}
        </Typography>
        <Typography variant="body2"  color="text.secondary">
          {data[i]?.desc}
        </Typography>
      </CardContent>
    </Card>
        ))}
        </>
    )}
    </Grid>
  )
}

export default Feed