import React from 'react'
import { useState ,useEffect} from 'react'
import { ChatState } from '../context/chatProvider'
import { toaster } from '../components/ui/toaster'
import axios from 'axios'
import { Box, Text ,Flex, Stack } from '@chakra-ui/react'
import { Button } from '../components/ui/button'
import { CiCirclePlus } from "react-icons/ci";
import ChatLoading from './chatLoading'
import { getSender } from '../config/chatLogic'
import GroupChatModel from './groupChatModel'
function MyChat({fetchAgain}) {
    const[loggedUser,setLoggedUser] = useState()
    const { setSelectedChat,selectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,} = ChatState()

    const FetchChat = async() =>{     
      try {
          
           const config = {
            headers:{
              "content-type":"application/json",
              Authorization:`Bearer ${user.token}`,
            },
           }
           const {data} = await axios.get("./api/chat",config);
          
           setChats(data);
         
           
      } catch (error) {
                    toaster.create({
                       position:"top-left",
                      description: "Error Fetching Data",
                      type: "warning",               
                }) 
        
      }
      
    }
useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    FetchChat();
    // eslint-disable-next-line
  }, [fetchAgain]);


  return (    
<>
       {/* <Box
           d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
           flexDir="column"
           alignItems="center"
           p={3}
           bg="white"           
           w={{ base: "100%", md: "31%" }}
           borderRadius="lg"
           borderWidth="1px"
                 >
  <Flex
    pb={3}
    px={3}
    fontSize={{ base: "28px", md: "30px" }}
    fontFamily="Work sans"
    justifyContent="space-between"
    alignItems="center"
    w="100%"  
  >
    <Text pl="24">My Chat</Text>

         <GroupChatModel>
     
    <Button
      variant="surface"
      fontSize={{ base: "17px", md: "10px", lg: "17px" }}
      ml={4}        
      alignSelf="center"  
    >
      New Group Chat <CiCirclePlus />
    </Button>
    
              </GroupChatModel>
    
  </Flex>

   {/* <Box 
   d='flex'
   flexDir='column'
   p='3'
   bg='#F8F8F8'
   width='100%'   
   borderRadius='lg'
  
   overFlowY='auto'
   
   >{chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}               
                px={3}
                py={2}
                borderRadius="xl"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat? getSender(loggedUser,chat.users)
                    : chat.chatName}
                </Text> 

</Box>
))}
           </Stack>  
           ): (
          <ChatLoading />
        )}
   </Box> */}
    
    {/* <Box 
  d="flex"
  flexDir="column"
  p="3"
  bg="#F8F8F8"
  width="100%"   
  borderRadius="lg"
  overflowY="auto"  // Make the box scrollable
  maxHeight="80vh"  // Set the maximum height to 80% of the viewport height (you can adjust this)
>
  {chats ? (
    <Stack overflowY="scroll">
      {chats.map((chat) => (
        <Box
          onClick={() => setSelectedChat(chat)}
          cursor="pointer"
          bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
          color={selectedChat === chat ? "white" : "black"}               
          px={3}
          py={2}
          borderRadius="xl"
          key={chat._id}
        >
          <Text>
            {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
          </Text> 
        </Box>
      ))}
    </Stack>
  ) : (
    <ChatLoading />
  )}
    </Box> */}




        {/* </Box> */} 
        {/* } */}

        <Box
  d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
  flexDir="column"
  alignItems="center"
  p={3}
  bg="white"
  w={{ base: "100%", md: "31%" }}
  borderRadius="lg"
  borderWidth="1px"
  mr='4'
>
  <Flex
    pb={3}
    px={3}
    fontSize={{ base: "20px", md: "30px" }}
    fontFamily="Work sans"
    justifyContent="space-between"
    alignItems="center"
    w="100%"
  >
    <Text pl="24">My Chat</Text>

    <GroupChatModel>
      <Button
        variant="surface"
        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
        ml={4}
        alignSelf="center"
      >
        New Group Chat <CiCirclePlus />
      </Button>
    </GroupChatModel>
  </Flex>

  {/* Scrollable Box for Chats */}
  <Box
    d="flex"
    flexDir="column"
    p="3"
    bg="#F8F8F8"
    width="100%"
    borderRadius="lg"
    overflowY="auto" /* Enables scrolling for the overflow */
    maxHeight="70vh" /* Set a fixed height to limit the content area */
  >
    {chats ? (
      <Stack spacing={2}>
        {chats.map((chat) => (
          <Box
            onClick={() => setSelectedChat(chat)}
            cursor="pointer"
            bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
            color={selectedChat === chat ? "white" : "black"}
            px={3}
            py={2}
            borderRadius="xl"
            key={chat._id}
          >
            <Text>
              {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
            </Text>
          </Box>
        ))}
      </Stack>
    ) : (
      <ChatLoading />
    )}
  </Box>
</Box>

</>
   
  )
}

export default MyChat
