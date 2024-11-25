const express =require('express')
const dotenv = require('dotenv')
const chats = require('./Data/data')
const connectDb = require('./config/Data')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const MessageRoutes = require('./routes/MessageRoutes')
const {notFound,errorHandler} = require('./middleware/errormiddleware')
const app = express()
dotenv.config()
connectDb()
app.use(express.json())

app.use('/api', userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',MessageRoutes)


app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 9000
const server = app.listen(PORT,console.log(`server is running successfully ${PORT}`))

const io = require("socket.io")(server,{
    pingTimeout : 60000,
    cors:{
        origin :"http://localhost:3000",
    }
})
io.on("connection",(socket)=>{
    //console.log("connected to socket.io")
    
    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        console.log(userData._id)
        socket.emit("connected")
    })

    socket.on("join chat",(room)=>{
          socket.join(room)
          //console.log("User Joined Room:" +room)
    })
   
      socket.on("typing", (room) => socket.in(room).emit("typing"));
     socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));  

    socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

})