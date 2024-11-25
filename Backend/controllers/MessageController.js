const asyncHandler = require("express-async-handler");
const Message = require("../models/messagemodel");
const User = require("../models/usermodel");
const Chat = require("../models/chatmodel");

const SendMessage = asyncHandler(async(req,res)=>{
    console.log("chatModel",Chat)
      const{content,chatId} = req.body
      if(!content || !chatId){
        console.log("Invalid data passed into request")
        res.sendStatus(400)
        return
      }
      var NewMessage = {
        sender:req.user._id,
        content:content,
        chat:chatId
      }
      try {
         
         var message = await Message.create(NewMessage)
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
          path: "chat.users",
          select: "name pic email",
        });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.json(message);

      } catch (error) {
        res.status(400);
       throw new Error(error.message);
    
        
      }
})
const AllMessages = asyncHandler(async(req,res)=>{
        try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
})

module.exports = {SendMessage,AllMessages}