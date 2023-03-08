import React, { useEffect, useState } from 'react';
import './Form.css';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/Posts';
import {toast} from'react-toastify';


function Form({user, currentId, setCurrentId,setError,setMessage }) {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: '',
  })
  const dispatch = useDispatch()
  const post = useSelector((state) => (currentId ? state.Posts.find((message) => message._id === currentId) : null));

  useEffect(() => {
    if (post) setPostData(post)
  }, [currentId])

 



  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  const sumbitHandle = (e) => {
    e.preventDefault()

    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result.name,creator: user?.result._id },setError,setMessage));
      clear();
    } else {
      dispatch(createPost({ ...postData, name: user?.result.name,creator: user?.result._id },setError,setMessage));
      clear();
    }
  }
  if (!user?.result.name) {
    return (
      <div className='center'>
        <h2>
          Please Sign In to create your own memories and like other's memories.
        </h2>
      </div>
    )

  }
const test =()=>{
  let time = new Date()

  toast(`Time ${time}`)
}

  return (
    <div className='form' >
      <form onSubmit={sumbitHandle} >
        <div className='form-inner'>
          <h2>{currentId ? 'Editing a Memories' : 'Creating a Memory'}</h2>
          <div className='form-group' >
            <p>Title</p>
            <input type={'text'} name='title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} placeholder='Title...' required />
          </div>
          <div className='form-group' >
            <p>Message</p>
            <textarea type={'text'} name='message' value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} placeholder='Message...' required/>
          </div>
          <div className='form-group' >
            <p>Tags</p>
            <input type={'text'} name='tags' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} placeholder='Tags...' required />
          </div>
          <div className='form-group' >
            <p>Web link</p>
            <input type={'text'} name='selectedFile' value={postData.selectedFile} onChange={(e) => setPostData({ ...postData, selectedFile: e.target.value })} placeholder='Image link...' required />
          </div>

          <button>Submit</button>
          <button onClick={test} >Time</button>
          <button onClick={clear} >clear</button>
        </div>
      </form>
    </div>
  )
}

export default Form


// <input type={'text'} name='tags' value={postData.tags} onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})}/>