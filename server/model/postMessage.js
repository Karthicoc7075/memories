const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    name:String,
    creator:String,
    title:String,
    message:String,
    tags:[String],
    selectedFile:String,
    likes:{
        type:[String],
        default:[]
    },
    createAt:{
        type:Date,
        default:new Date().getTime()
    }
})

module.exports = mongoose.model('postMessage',postSchema)