
import * as api from '../api/index';

export const getPosts = (error) => async (dispatch) => {
   try{
     const {data} = await api.fetchPosts();

    dispatch({type:'FETCH_ALL',payload:data})
   }catch(err){
    error(err.response.data.error);
   }
  }

export const createPost =(post,error,message)=> async(dispatch)=>{
  try{
    const {data} = await api.createPost(post);
    if(data){
      message('post created  successfully')
     }
    dispatch({type:'CREATE',payload:data})
  }catch(err){
    error(err.response.data.error);
  }
}

export const updatePost =(id,post,error,message)=> async(dispatch)=>{
  try{
    const { data } = await api.updatePost(id,post);
    if(data){
      message('post updated successfully')
     }
    dispatch({type:'UPDATE',payload:data})
  }catch(err){
    error(err.response.data.error);
  }
} 
export const deletePost =(id,error,message)=> async(dispatch)=>{
  try{
    const {data} = await api.deletePost(id);
    if(data){
      message('post delete successfully')
     }
    dispatch({type:'DETELE',payload:data})
  }catch(err){
    error(err.response.data.error);
  }
}

export const likePost=(id,error)=>async(dispatch)=>{
  try{
    const {data} = await api.likePost(id);
    dispatch({type:'LIKE',payload:data})
  }catch(err){
    error(err.response.data.error);
  }
}