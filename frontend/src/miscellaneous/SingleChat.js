import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/chatProvider'
import { Box, Flex, Input, Spinner, Text } from '@chakra-ui/react'
import { Player } from '@lottiefiles/react-lottie-player';
import { CgProfile } from "react-icons/cg";
import { getSender, getSenderFull } from '../config/chatLogic';
import ProfileModel from './ProfileModel'
import UpdateGroupChatModel from './UpdateGroupChatModel';
import axios from 'axios';
import { toaster } from '../components/ui/toaster';
import ScrollableChat from './scrollableChat';
import './style.css'
import io from "socket.io-client"



const ENDPOINT = "http://localhost:9000";
var socket,selectedChatCompare
function SingleChat({fetchAgain,setFetchAgain}) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const[socketConnected,setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);


     const{user,selectedChat,setSelectedChat,notification,setNotification}=ChatState()
        
     
  
    
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toaster({
        title: "Error Occurred!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
       
  useEffect(()=>{
  socket = io(ENDPOINT)
  socket.emit("setup",user)
  socket.on("connected",()=>
      setSocketConnected(true)  
  )
   socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

},[])

   useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);
  console.log("notification......",notification)
    
  useEffect(()=>{
    socket.on("message received",(newMessageReceived)=>{
      if(!selectedChatCompare || 
        selectedChatCompare._id !== newMessageReceived.chat._id){
        if(!notification.includes(newMessageReceived)){
         setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
      }}
        else{
          setMessages ([...messages,newMessageReceived])
        }  
    })
  })
   

    const sendMessage = async(event) =>{
      if(event.key === "Enter" && newMessage){
        socket.emit('stop typing',selectedChat._id)
        try {
             const config = {
              headers:{
                "content-Type"  : "application/json",
                Authorization : `Bearer ${user.token}`,
              }
             }
              setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit('new Message',data)
        // setNewMessage("")
        setMessages([...messages, data]);

        } catch (error) {
              toaster({
                position:"top",
                description:"Failed to send Message",
                type:"error"
              })
          
        }
      }
    }


    const typingHandler = (e) =>{
           setNewMessage(e.target.value)
            if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
    }
  return (
    <>           
         {selectedChat ? (
            <>
        <Text  fontSize={{ base: "28px", md: "30px" }}
        pb={3} px={2} w="100%" fontFamily="Work sans"
        d="flex" justifyContent={{ base: "space-between" }} alignItems="center">       
        {!selectedChat.isGroupChat ?(
            <>             
           <Box border='1px' pl='1' boxShadow='lg' borderRadius='md' p='4' bg='whiteSmoke'>
            <Flex  display='flex' justifyContent=''>
              <ProfileModel  
                  user={getSenderFull(user,selectedChat.users)}>          
                 <CgProfile />                 
              </ProfileModel>
              {getSender(user,selectedChat.users)}
            </Flex>
           
           </Box>                                   
            </>
        ):(                                   
            <> 
            <Box display='flex' 
            paddingInlineStart='1'
            alignItems='end'justifyContent='space-around' fontSize='4xl' mr='20'>           
                {selectedChat.chatName.toUpperCase()}           
            
                   <UpdateGroupChatModel
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                   />               
            </Box>                
            </>
        )}
        </Text>           
          <Box
  d="flex"
  flexDir="column"
  justifyContent="flex-end"
  p={3}
  bg="#E8E8E8"
  w="100%"
  h="80%"
  borderRadius="lg"
  overflow="hidden"
>
  <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
    {loading ? (
      <Spinner
        fontSize="md"
        w={10}
        h={10}
        alignSelf="center"
        margin="40"
        ml="64"
      />
    ) : (
      <div className="messages" style={{ flexGrow: 1, overflowY: "auto" }}>
        <ScrollableChat messages={messages} />
      </div>
    )}
   
    <div onKeyDown={sendMessage} isRequired>
    {isTyping? <div>       
             <Player
                src=
"https://lottie.host/dae58000-8e9c-4557-bc2a-b71e5d5ebfa6/EmNCNpQynF.json"
                loop autoplay style={{ width: '50px', height: '50px' }}

                />
    </div> : (<> </>)}
      <Input
        placeholder="Type Message"
        variant="outline"
        mt='2'
        bg="#E0E0E0"
        onChange={typingHandler}
        value={newMessage}
      />
    </div>
  </div>
          </Box>
            </>
         ): (            
        <Box
        fontSize="3xl" fontFamily="fantasy"
        display="flex" alignItems="center"
        justifyContent="center" h="100%"flexDir="column">  
            <Flex
              dis play="flex"alignItems="center"
              justifyContent="center" gap="10px">
              <Text>Select Chat to Start Conversation...</Text>
              <Player
                src="https://lottie.host/80429556-0e51-43c1-bdfb-9335ae412681/UY3JhEJ28E.json"
                loop autoplay style={{ width: '150px', height: '150px' }}/>
            </Flex>
        </Box>           
         )}
      
       </>
    
  )}
export default SingleChat
