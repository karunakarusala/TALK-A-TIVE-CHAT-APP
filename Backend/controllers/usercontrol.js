const { error } = require('console')
const asyncHandler = require('express-async-handler')
const User = require('../models/usermodel')
const bcrypt = require('bcryptjs')
const generateToken = require('../config/generateToken')
const registerUser = asyncHandler(async(req,res) =>{
    const{name,email,password} =req.body
    
    if(!name || !email || !password){
        res.status(400)
        
        throw  new Error("please fill all details")
    }

    const userExists = await User.findOne({email})

    if(userExists){
       
        res.status(400)
        throw new Error("User Already exists")
       
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            token : generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Failed to create user")
    }

})
const authUser = asyncHandler(async(req,res)=>{
    const{email,password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
         res.json({
             _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            token : generateToken(user._id)
         })

    }
    else{
        res.status(400)
        throw new Error ("Invalid email or password")
    }
})


const allUsers = asyncHandler(async(req,res) =>{
   console.log("Search Query:", req.query.search);
   const keyword = req.query.search
   
   ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
    console.log("keyword",keyword)
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);

})

module.exports ={registerUser,authUser,allUsers}