import { useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
function App() {
  const navigate=useNavigate()
  useEffect(() => {
    const token=localStorage.getItem('user')
    if(!token) navigate('/login');
   },[])
  
  return (
    <>
  <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
  </Router>
    </>   
  );
}

export default App;
