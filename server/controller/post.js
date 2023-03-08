const mongoose = require('mongoose')
const PostMessage = require('../model/postMessage');

const getPosts = async (req, res) => {
     PostMessage.find()
     .then((data) => {
        let posts = [];
        data.map((item) => {
            posts.push({
                _id: item._id,
                name: item.name,
                creator: item.creator,
                title: item.title,
                message: item.message,
                tags: item.tags,
                selectedFile: item.selectedFile,
                createAt: item.createAt,
                isLiked:  item.likes.includes(req.userId),
                likeCount: item.likes.length
            });
        });
        res.status(200).send(posts)
    })
    .catch((err) =>{
        res.status(404).json({ message: err })
    })
}

const createPost = async (req, res) => {
    const { title, message,creator, selectedFile, name, tags } = req.body

    const newPostMessage = new PostMessage({title,message,selectedFile,name,tags,creator})
    try {
       await newPostMessage.save()
       res.status(200).send(newPostMessage)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}


const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, selectedFile, creator,name, tags } = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const update=   {title, message, selectedFile, creator,name, tags,_id:id}
     PostMessage.findByIdAndUpdate(id,update, { new: true })
     .then((item)=>{
        let posts

            posts={
                _id: item._id,
                name: item.name,
                creator: item.creator,
                title: item.title,
                message: item.message,
                tags: item.tags,
                selectedFile: item.selectedFile,
                createAt: item.createAt,
                isLiked:  item.likes.includes(req.userId),
                likeCount: item.likes.length
            }

            res.status(201).send(posts)
    })
    .catch((err)=>{
        res.status(400).json({ message: err })
   })
 
}

const deletePost = async (req, res) => {
    const {id} = req.params
    try {
       const deletePost = await PostMessage.findByIdAndDelete(id);

        res.status(201).send(deletePost);
    } catch (err) {
        res.status(400).json({ message: err })
    }
}


const likePost = async(req,res)=>{
    const { id } = req.params;


    if(!req.userId){
        console.log('Not Authecation');
        return
    }

    const post =await PostMessage.findById(id)
    const index = post.likes.findIndex((id)=>id === req.userId)
    if(index == -1){
        post.likes.push(req.userId)
    }else{
        post.likes =post.likes.filter((id)=>id != req.userId)
    }
    await PostMessage.findByIdAndUpdate(id,post, { new: true })
    .then((item)=>{
        let posts

            posts={
                _id: item._id,
                name: item.name,
                creator: item.creator,
                title: item.title,
                message: item.message,
                tags: item.tags,
                selectedFile: item.selectedFile,
                createAt: item.createAt,
                isLiked:  item.likes.includes(req.userId),
                likeCount: item.likes.length,
            }

            res.status(201).send(posts)
    })
    .catch((err)=>{
         res.status(400).json({ message: err })
    })
  
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
}