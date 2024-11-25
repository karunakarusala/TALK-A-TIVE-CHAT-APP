import React, { useContext } from 'react'
import { useState , useEffect} from 'react';
import { createContext } from "react"; 
import {useNavigate} from 'react-router-dom'

const ChatContext  = createContext()

const ChatProvider = ({children}) => {
    const [user,setUser] = useState()
    const[selectedChat,setSelectedChat] = useState()
    const[notification,setNotification] = useState([])
    const[chats,setChats]=useState()

    const navigate = useNavigate()

     useEffect(() =>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
         setUser(userInfo)

         if(!userInfo){
            navigate('/home')
         }
     },[navigate])
    
  return (
      <ChatContext.Provider value=      
      {{user,setUser,
        selectedChat,setSelectedChat,
        notification,setNotification,
        chats,setChats,     
      }}     >
              {children}
      </ChatContext.Provider>
  )
}

export const ChatState =()=>{
    return useContext(ChatContext)
}

export default ChatProvider

