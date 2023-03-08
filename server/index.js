const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express()
app.use(cors({
    origin:'http://localhost:3000'
}))
app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}))


const postRoute = require('./routes/post');
const userRoute = require('./routes/user');

app.use('/posts',postRoute);
app.use('/user',userRoute);
    
const CONNECTION_URL = 'mongodb+srv://karthi:karthi7075@cluster0.z3xt0.mongodb.net/Memories?retryWrites=true&w=majority'
const PORT  = 5000;

mongoose.connect(CONNECTION_URL)
.then(()=>app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}...`);
})
 )
 .catch((err)=>console.log(err))
