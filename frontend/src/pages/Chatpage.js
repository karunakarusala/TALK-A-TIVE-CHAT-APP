import React, { useState } from 'react'
import { ChatState } from '../context/chatProvider'
import SideDrawer from '../miscellaneous/sideDrawer'
import ChatBox from '../miscellaneous/ChatBox'
import MyChat from '../miscellaneous/MyChat'
import { Box } from '@chakra-ui/react'
function ChatPage() {
    const {user} = ChatState()
    const[fetchAgain,setFetchAgain] = useState(false)
  return (
    <div style={{width:'100%'}}>
           
           {user && <SideDrawer/>}

           <Box  
           display='flex'
           justifyContent='space-between'
           width='100%'
           height='92.3vh'
           p='10'
           >
                {user && 
                <MyChat fetchAgain={fetchAgain} 
             />}
                {user && 
                <ChatBox fetchAgain={fetchAgain} 
                setFetchAgain={setFetchAgain}/>}
           </Box>



           
    </div>
  )
}

export default ChatPage
