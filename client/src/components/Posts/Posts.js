import React,{useEffect} from 'react';
import './Posts.css'
import {useSelector} from 'react-redux';
import Post from './Post/Post';
import Loading from '../UI/Loading/Loading';
function Posts({setCurrentId,user,setError,setMessage}) {
  const Posts = useSelector(state=>state.Posts)

  return (
    <section className='posts' >
     {Posts.length==0 ? <h2>No Data</h2>:
   <div className='container' >
      {Posts.map((post,i)=>(
      <Post key={i} post={post}  user={user} setCurrentId={setCurrentId} setError={setError} setMessage={setMessage} />
     ))}
     </div>}
    </section>
  )
}

export default Posts
