import React,{useState,useEffect} from 'react'
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
// import {useNavigate} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'


function Signup() {
  const navigate=useNavigate()
  const [userSingup,setUserSignup]=useState({
    username:'',
    email:'',
    password:'',
    cpassword:''
  })
  const [newRecord,setNewRecord]=useState([])
  const [formErrors,setFormErrors]=useState({})
  const [isSubmit,setIsSubmit]=useState(false)
  // const navigate=useNavigate()
  const paperStyle={
    padding:'20px',
    height:'50%',
    width:280,
    margin:'50px auto'
  }
  const avatarStyle={
    backgroundColor:'#1bbd7e',
  }
  const buttonStyle={
    margin:'20px 0'
  }
  const input={
    margin:'30px 0 0 0 '
  }
  const handleSubmit=(e)=>{
      e.preventDefault()
      setFormErrors(validate(userSingup));
      setIsSubmit(true)
    
    //  axios.get('http://localhost:5000/posts').then((res)=>{
    //   console.log(res);
    //  })
     
  }
  useEffect(() => {
    console.log(formErrors);
   if(Object.keys(formErrors).length===0 &&isSubmit){
    // setNewRecord({...userSingup,id:new Date().getTime().toString()})
    axios.post('http://localhost:5001/api/auth/register',userSingup)
    .then((res)=>{
      console.log(res);
      // localStorage.setItem("token",JSON.stringify(res.data))
      navigate('/login')
    })
    .catch((err)=>{
      console.log(err);
    })
   }
  }, [formErrors])
  
  const validate=(values)=>{
       const errors={}
       const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
       const nameRegex=/^[a-z ,.'-]+$/i;
       if(!values.username) errors.username="Username is required";
       else if(!nameRegex.test(values.username))errors.username="Username is not valid one";
       if(!values.email) errors.email="Email is required";
       else if(!regex.test(values.email)) errors.email="This is not a valid Email"
       if(!values.password) errors.password="password is required";
       else if(values.password.length<4) errors.password="Password must be 4 letters"
      //  if(!values.cpassword) errors.password="password is required";
      //  else if(values.password!==values.cpassword)errors.cpassword="password is not matching"
         return errors;
      }
  const handleChange=(e)=>{
    const name=e.target.name
    const value=e.target.value
     setUserSignup({...userSingup,[name]:value})
  }
  return (
     <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
           <Avatar style={avatarStyle}></Avatar>
           <h2>Sign Up</h2>
        </Grid>
        <Grid style={input}>
          <form onSubmit={handleSubmit}>
     <TextField name='username' value={userSingup.username} onChange={handleChange} type='text'  fullWidth placeholder='Enter username' id="outlined-basic" label="Username" variant="standard" />
     <Typography sx={{color:'red'}}>{formErrors.username}</Typography>
     <TextField name='email' value={userSingup.email} onChange={handleChange} type='email'  fullWidth placeholder='Enter email' id="outlined-basic" label="Email" variant="standard" />
     <Typography sx={{color:'red'}}>{formErrors.email}</Typography>
     <TextField name='password' value={userSingup.password} onChange={handleChange} type='password'  fullWidth placeholder='Enter password' id="outlined-basic" label="Password" variant="standard" />
     <Typography sx={{color:'red'}}>{formErrors.password}</Typography>
     {/* <TextField name='cpassword' value={userSingup.cpassword} onChange={handleChange} type='password'  fullWidth placeholder='Confirm password' id="outlined-basic" label="Confirm password" variant="standard" /> */}
     {/* <Typography sx={{color:'red'}}>{formErrors.cpassword}</Typography> */}
     <FormControlLabel control={
       <Checkbox defaultChecked />
      } label="Remember me" />
      <Button style={buttonStyle} variant='contained' type='submit' color='primary' fullWidth>Sign Up</Button>
      </form>
      </Grid>
     <Typography>Already have an account ?
     <Link onClick={()=>navigate('/login')}>Sign In</Link>
     </Typography>
      </Paper>
     </Grid>
  
  )
}

export default Signup