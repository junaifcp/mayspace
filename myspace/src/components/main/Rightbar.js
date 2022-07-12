import {Button, Card, TextField, Typography } from '@mui/material'
import React, { useState,useEffect, useContext } from 'react'
// import FileBase from 'react-file-base64';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Rightbar() {
  const {user}=useContext(AuthContext)
  const navigate=useNavigate()
  const [story,setStory]=useState({
    title:"",
    type:"",
    desc:""
   })
   const [formError,setFormError]=useState({})
   const [isSubmit,setIsSubmit]=useState(false)
   const [newRecord,setNewRecord]=useState({})
   const handleSubmit=(e)=>{
    e.preventDefault()
    setFormError(validate(story))
    setIsSubmit(true)
   }
   const validate=(values)=>{
    const errors={}
    const nameRegex=/^[a-z ,.'-]+$/i;
    if(!values.title) errors.title="Title is required";
    if(!values.type) errors.type="Type is required";
    else if(values.type.length<4) errors.type="This is not a valid.. minimum 3 letter required"
    else if(!nameRegex.test(values.type))errors.type="Letters and special charecters are not allowed";
    if(!values.desc) errors.desc="Description is required";
    else if(values.desc.length<20) errors.desc="Description can not be too short"
      return errors;
   }
   useEffect(() => {
    const token=localStorage.getItem('user')
   if(Object.keys(formError).length===0 &&isSubmit){
    setNewRecord({...story,...user})
    console.log(newRecord);
    axios.post('http://localhost:5001/api/posts',newRecord)
    .then((res)=>{
      // localStorage.setItem("token",JSON.stringify(res.data))
      window.location='/'
    })
    .catch((err)=>{
      console.log(err);
    })
   }else if(!token){
    navigate('/login')
   }else{
    navigate('/')
   }
  }, [formError])
   const handleChange=(e)=>{
          const {name,value}=e.target;
          setStory({...story,[name]:value})
   }
  return (
    <Card flex={2} p={2} sx={{display:{xs:'none',sm:'block'},padding:'20px',maxWidth:345}} >  
     <Typography align='center' gutterBottom variant="h5" component="div">
          Add Your Story
        </Typography>
    <form onSubmit={handleSubmit}>    
       {/* <TextField name='creator' label="Creator" fullWidth autocomplete="none" variant="standard"/> */}
       <TextField name='title' value={story.title} onChange={handleChange} label="Title" fullWidth autocomplete="none" variant="standard"/>
       <Typography sx={{color:'red'}}>{formError.title}</Typography>
      <TextField name='desc' value={story.desc} onChange={handleChange} label="Message" fullWidth multiline rows={5} autocomplete="none" variant="standard"/>
      <Typography sx={{color:'red'}}>{formError.desc}</Typography>
      <TextField name='type' value={story.type} onChange={handleChange}  label="Tags (coma seperated)" fullWidth autocomplete="none" variant="standard"/><br/>
      <Typography sx={{color:'red'}}>{formError.type}</Typography>
      <br/><br/>
      <div>
      </div><br/>
      <Button variant="contained" type="submit" fullwidth>Submit</Button>
    </form>
    </Card>
  )
}

export default Rightbar
