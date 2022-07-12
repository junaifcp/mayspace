import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import useFetch from '../../hooks/useFetch'
import Login from '../../pages/Login'
import './adminStyle.css'
import Navbar from './Navbar'

function Users() {
  const navigate=useNavigate()
  // const {user,loading}=useContext(AuthContext)
  const {data,loading,error,dispaatch}=useFetch("http://localhost:5001/api/users")
  console.log(data);

 const deleteUser=(id)=>{
  try {
    console.log(id);
    console.log("entered");
    axios.delete(`http://localhost:5001/api/users/${id}`)
    .then(res=>{
      console.log(res);
      alert(res.data)
      window.location.href = '/';
    })
  } catch (error){
    console.log(error);
  }
 }
 const blockUser=async(id)=>{
  try {
    console.log(id);
    console.log("entered");
   await axios.put(`http://localhost:5001/api/users/block/${id}`)
    .then(res=>{
      console.log(res.data);
      alert(res.data)
      window.location.href = '/';
    })
  } catch (error){
    console.log(error);
  }
 }
 const unBlockUser=(id)=>{
  try {
    console.log(id);
    console.log("entered");
    axios.put(`http://localhost:5001/api/users/unblock/${id}`)
    .then(res=>{
      console.log(res);
      alert(res.data)
      window.location.href = '/';
    })
  } catch (error){
    console.log(error);
  }
 }
  return (
<div>
<div className="container">
<div><button className='btn btn-primary' onClick={()=>window.location="/addUser"}>Add a user</button></div>
  <div className="row">
    <div className="col-12">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {loading?("loading please wait"):(<>
    {data.map((data,i)=>(
     <tr>
     <th scope="row">{i+1}</th>
     <td>{data.username}</td>
     <td>{data.email}</td>
     <td>
      {data.blockStatus?(
        <button type="button" className="btn btn-primary" onClick={blockUser.bind(this,data._id)}><i class="fa-solid fa-eye-low-vision"></i></button>
        ):(
          <button type="button" className="btn btn-primary" onClick={blockUser.bind(this,data._id)}><i className="far fa-eye"></i></button>
      )}
       
     <button onClick={deleteUser.bind(this,data._id)} type="button" className="btn btn-danger"><i class="far fa-trash-alt"></i></button>
     </td>
   </tr>
        ))}
    </>
    )}
        </tbody>
      </table>
    </div>
  </div>
 </div> 
</div>
  )
}

export default Users
