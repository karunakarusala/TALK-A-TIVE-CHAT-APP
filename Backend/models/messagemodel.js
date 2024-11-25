//const { timeStamp } = require('console')
const mongoose = require('mongoose')
//const { type } = require('os')
const messageModel = mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    content:{type:String,trim:true},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:'Chat'},
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},
    {
        timeStamp:true
    }
)
const Message = mongoose.model("Message",messageModel)
module.exports = Message