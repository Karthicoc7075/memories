const express = require('express');
const routes = express.Router();


const {getPosts,createPost,updatePost,deletePost,likePost} = require('../controller/post')
const auth = require('../middleware/auth');


routes.get('/',auth,getPosts)
routes.post('/',auth,createPost)
routes.patch('/:id',auth,updatePost)
routes.delete('/:id',auth,deletePost)
routes.patch('/:id/likePost',auth,likePost)

module.exports= routes;

