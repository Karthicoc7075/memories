const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const UserModel = require('../model/user');
const secret = 'test'

const signIn=async(req,res)=>{
    const  {email,password} = req.body

    try{

        const oldUser = await UserModel.findOne({email});
        
    if(!oldUser){
        return res.status(400).json("Invalid Email")
    }

    const correctPassword = await bcrypt.compare(password,oldUser.password)

    if(!correctPassword){
       
        return  res.status(400).json("Password incorrect")
    }

    const token = jwt.sign({email:oldUser.email,_id:oldUser._id},secret,{expiresIn:"1h"})
    
    res.status(200).send({result:oldUser,token})
    }catch(err){
        res.status(404).json(err)
    }
    
}

const signUp=async(req,res)=>{
    const  {email,password,firstName,lastName } = req.body

try{
    const oldUser = await UserModel.findOne({email})

    if(oldUser){
        return res.status(400).json('Email already exists');
    }


    const encryptPassword =  bcrypt.hashSync(password)
 
    const result = await UserModel.create({email:email,password:encryptPassword,name:`${firstName}${lastName}`})

    const token = jwt.sign({email:result.email,_id:result._id},secret,{ expiresIn:"1h"})
    res.status(201).send({result,token})
    }catch(err){
        res.status(500).json(err)
    }
}


module.exports={
    signIn,
    signUp
}
