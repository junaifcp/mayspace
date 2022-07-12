import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import React,{useState,useEffect, useContext} from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
function Login() {
  const [credentials,setCredentials]=useState({
    username:undefined,
    password:undefined
  })
  const {loading,error,dispatch}=useContext(AuthContext)
  const navigate=useNavigate()
  const [login,setLogin]=useState({username:'',password:''})
  const [formError,setFormError]=useState({})
  const [isSubmit,setIsSubmit]=useState(false)
  const [newRecord,setNewRecord]=useState([])
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
  const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log('entered handle submit');
        setFormError(validator(login));
        setIsSubmit(true)
        if(Object.keys(formError).length===0&&isSubmit){
          dispatch({type:"LOGIN_START"})
          try {
            const res=await axios.post("http://localhost:5001/api/auth/login",login)
            dispatch({type:"LOGIN_SUCCESS",payload:res.data})
            console.log("this is res");
            console.log(res);
            navigate('/')
          } catch (error) {
            dispatch({type:"LOGIN_FAILURE",payload:error.response.data})
          }
        }
  }
  const validator=(values)=>{
    const errors={}
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    if(!values.username) errors.username="Username is required";
    // else if(!regex.test(values.username)) errors.username="This is not a valid Name"
    if(!values.password) errors.password="password is required";
    else if(values.password.length<4) errors.password="Password must be 4 letters"
    return errors
  }
  
  
  const handleChange=(e)=>{
    const {name,value}=e.target;
    
    setLogin({...login,[name]:value})
  } 
  return (
     <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
           <Avatar style={avatarStyle}><LockOpenIcon/></Avatar>
           <h2>Sign in</h2>
        </Grid>
        <Grid style={input}>
  <form onSubmit={handleSubmit}>
     <TextField name='username' value={login.username} onChange={handleChange}  fullWidth placeholder='Enter username' id="outlined-basic" label="Username" variant="standard" />
     <Typography sx={{color:'red'}}>{formError.username}</Typography>
     <TextField name='password' value={login.password} onChange={handleChange} type='password'  fullWidth placeholder='Enter password' id="outlined-basic" label="Password" variant="standard" />
     <Typography sx={{color:'red'}}>{formError.password}</Typography>
     <FormControlLabel control={
       <Checkbox defaultChecked/>
      } label="Remember me" />
      <Button disabled={loading} style={buttonStyle} variant='contained' type='submit' color='primary' fullWidth>Sign In</Button>
     {error&&<span style={{color:'red'}}>{error.message}</span>}
      </form>
      </Grid>
     <Typography>
     <Link href="/">Forgot password</Link>
     </Typography>
     <Typography>Do you have an account ?
     <Link href="/signup">Sign Up</Link>
     </Typography>
      </Paper>
     </Grid>
  
  )
}

export default Login