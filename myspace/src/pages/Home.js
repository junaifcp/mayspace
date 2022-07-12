import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/main/Navbar'
import Sidebar from '../components/main/Sidebar'
import Feed from '../components/main/Feed'
import Rightbar from '../components/main/Rightbar'
import { Box} from '@mui/system'
import { Stack } from '@mui/material'
import { AuthContext } from '../context/AuthContext'
import useFetch from '../hooks/useFetch'
import Admin from './Admin'
function Home() {
  const {user}=useContext(AuthContext)
  const navigate=useNavigate()
useEffect(() => {
 const token=localStorage.getItem('user')
 if(!token) navigate('/login');
},[])
  return (
    <Box>
      {user&&user.isAdmin?<Admin/>:(<>
        <Navbar/>
        <Stack direction='row' spacing={2} justifyContent='space-between'>
      <Feed/>
     {/* <Sidebar/> */}

      {user?<Rightbar/>:<></>}

      </Stack>
      </>)}
    </Box>
  )
}

export default Home