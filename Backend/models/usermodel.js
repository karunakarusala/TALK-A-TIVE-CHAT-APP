const { timeStamp } = require('console')
const mongoose = require('mongoose')
// const { type } = require('../models/usermodel')
const bcrypt = require('bcryptjs')
const userModel = mongoose.Schema({
    name : {type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true}
},
{
    timestamps:true
},

//{collection : 'User'}
)
userModel.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
userModel.pre("save",async function(next){
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    
})
const User = mongoose.model('User',userModel,'User')
  
module.exports=User