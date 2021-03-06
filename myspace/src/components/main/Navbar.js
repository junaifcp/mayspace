import { Mail, Notifications, Workspaces } from '@mui/icons-material'
import { AppBar, Avatar, Badge, Box, InputBase, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
const StyledToolbar=styled(Toolbar)({
  display: 'flex',
  justifyContent:'space-between'
})
const Search=styled('div')(({theme})=>({
  backgroundColor:'white',
  padding:'0 10px',
  borderRadius:theme.shape.borderRadius,
  width:'40%'

}))
const Icons=styled(Box)(({theme})=>({
 display: 'none',
 gap:'20px',
 alignItems:'center',
 [theme.breakpoints.up('sm')]:{
  display:'flex'
 }
}))
const UserBox=styled(Box)(({theme})=>({
  display: 'flex',
  gap:'10px',
  alignItems:'center',
  [theme.breakpoints.up('sm')]:{
    display:'none'
   }
 }))
 const logout=()=>{
   localStorage.clear("user")
   window.location.href = '/';
 }
 const login=()=>{
  console.log("button clicked");
}
function Navbar() {
  const navigate=useNavigate()
  const {user}=useContext(AuthContext)
  const [open,setOpen]=useState(false)
  
  return (
    <AppBar position='sticky'>
      <StyledToolbar>
       <Typography sx={{display:{xs:'none',sm:'block'}}}>
        MY SPACE
       </Typography>
       <Workspaces sx={{display:{xs:'block',sm:'none'}}}/>
        <Search><InputBase placeholder='search...'/></Search>
      {user?(<><Icons>
         <Avatar  onClick={(e)=>setOpen(true)} 
         sx={{width:30,height:30}}
          src=''/>
          <Typography variant='span'>{user.username}</Typography>
        </Icons>
        <UserBox  onClick={(e)=>setOpen(true)}>
        <Avatar sx={{width:30,height:30}} 
        src=''/>
       <Typography variant='span'>{user.username}</Typography>
        </UserBox></>):(<>
          <Typography variant=''><Link to='/signup' style={{textDecoration:'none', color:'white'}}> REGISTER</Link></Typography>
          <Typography variant=''><Link to='/login' style={{textDecoration:'none', color:'white'}}> LOGIN</Link></Typography>
        </>)}

      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
   
        open={open}
        onClose={(e)=>setOpen(false)}
    
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar