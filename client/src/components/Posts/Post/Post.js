import React,{useEffect, useState} from 'react';
import './Post.css';
import moment from 'moment'
import Delete from '@material-ui/icons/Delete';
import {IconButton} from '@material-ui/core'
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux'
import { likePost, deletePost } from '../../../actions/Posts';


function Post({post,setCurrentId,user,setError,setMessage}) {
   const dispatch = useDispatch();
   

  //  useEffect(()=>{
  //        setUser(JSON.parse(localStorage.getItem('profile')))
  //  },[user?.result])


   const Likes =()=>{
    if(post.likeCount > 0 && user?.result ){
      return (
        post.isLiked ? 
        <><ThumbUpAlt/>&nbsp;{post.likeCount}&nbsp;{post.likeCount > 1 ? 'Likes' : 'Like'}  </>: <><ThumbUpAltOutlined/>&nbsp;{post.likeCount}&nbsp;{post.likeCount > 1 ? 'Likes' : 'Like'}  </>
      )
      }

      
      return <><ThumbUpAltOutlined/>&nbsp;{post.likeCount >0  ? post.likeCount :null}&nbsp;{post.likeCount > 1 ? 'Likes' : 'Like'}  </>
   }
  
  return (
      <div className='card' >
     <div className='card_img' >
     <img src={post.selectedFile}/>
     </div>
     <div className='overlay-1' >
      <h3 className='creator' >{post.name}</h3>
      <p className='timestamp' >{moment(post.createAt).fromNow()}</p>

     </div>
     <div  className='overlay-2'  > 
     {user?.result._id ===  post.creator ? 
     <MoreHoriz onClick={()=>setCurrentId(post._id)} />:null
}
     </div> 
     <div className='card_details' >
      <div className='tags' >
        {post.tags.map((tag)=>(
          <a key={tag} href={tag} >#{tag} </a>
        ))}
      </div>
      <h2 className='title'>{post.title}</h2>
      <p className='message' >{post.message}</p>
      <div className='buttons' >
        <div className='btn'  onClick={() => dispatch(likePost(post._id,setError))}>
         <Likes/>
        </div>
       {user?.result._id ===  post.creator ? 
        <div className='btn' onClick={() => dispatch(deletePost(post._id,setError,setMessage))} >
        <Delete/>Delete
      </div> :null}
      </div>
     </div>
    </div>
  )
}

export default Post
{/* \{post.isLiked.length > 1 ? 'Likes' : 'Like'}<</> */}