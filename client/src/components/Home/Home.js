import React, { useEffect, useState } from 'react'
import { getPosts } from '../../actions/Posts'
import {useDispatch }from 'react-redux'
import { toast, ToastContainer }  from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Form from '../Form/Form'
import Navbar from '../Navbar/Navbar'
import Posts from '../Posts/Posts'

function Home() {
  const [currentId,setCurrentId] = useState(null)
  const [error,setError] = useState('')
  const [message,setMessage] = useState('')
  const [user,setUser] = useState(null)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPosts(setError));
  },[currentId,dispatch]) 


useEffect(()=>{
if(error){
  toast.warn(error)
  setError('')
}
},[error])

useEffect(()=>{
  if(message){
    toast.success(message)
    setMessage('')
  }
  },[message])


  return (
    <div >
    <Navbar user={user} setUser={setUser} />
    <ToastContainer/>
    <section className='grid' >
    <Form  user={user} setMessage={setMessage} setError={setError} currentId={currentId} setCurrentId={setCurrentId} />
        <Posts  user={user} setMessage={setMessage} setError={setError} setCurrentId={setCurrentId} />
    </section >
</div>
  )
}

export default Home
