import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import './Navbar.css';
import { } from '../../actions/Auth'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar({user,setUser}) {
  const dispatch = useDispatch();

  const logout=()=>{
    dispatch({type:'LOGOUT'});
    setUser(null);
    setUser(JSON.parse(localStorage.getItem('profile')))
    toast.success('logout sucessfully')
  }


  useState(()=>{
    const token = user?.token;
    if(token){
      let decodedToke =decode(token) 
      
      if(decodedToke.exp * 1000 < new Date().getTime()) logout();
    }
  },[])
  return (
   <nav>
    <div className='container' >
    <h1>Memories</h1>
      {user?.result ? 
      <button onClick={logout} >
      LOGOUT
    </button>:
    <Link to='/auth'>Login</Link>
      }
    </div>
   </nav>
  )
}

export default Navbar
