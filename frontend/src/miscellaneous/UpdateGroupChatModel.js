import React, { useState } from 'react'
import { Button } from "../components/ui/button"
import {
  DialogActionTrigger,DialogBody,DialogCloseTrigger,DialogContent,DialogFooter,
  DialogHeader,DialogRoot,DialogTitle,DialogTrigger,
} from "../components/ui/dialog"
import { TiThMenu } from "react-icons/ti";
import { Box, Flex, Input ,Spinner,Stack, Text} from '@chakra-ui/react';
import { ChatState } from '../context/chatProvider';
import UserBadgeItem from '../userAvatar/UserBadgeItem';
import { Field } from '../components/ui/field';
import axios from 'axios';
import { toaster } from '../components/ui/toaster';
import UserListItem from '../userAvatar/userListItems';
import { trusted } from 'mongoose';

function UpdateGroupChatModel({fetchAgain,setFetchAgain,fetchMessages}) {
    const{selectedChat,setSelectedChat,user} =ChatState()
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const handleRemove = async(user1) =>{
      if(selectedChat.groupAdmin._id !== user._id && user1._id !== user._id)  {
          toaster.create({
             position:"top-left",
             description: "only Admin can Remove someone",
             type: "warning", 
         })
         return
      }   
      try {
        setLoading(trusted)
        const config = {
          headers:{
            Authorization : `Bearer ${user.token}`,
          },
        }
        const {data} = await axios.put('/api/chat/groupRemove',{
          chatId:selectedChat._id,
          userId:user1._id,
        },config)
        user1._id === user._id ? setSelectedChat() :setSelectedChat(data)
        setFetchAgain(!fetchAgain)
        fetchMessages()
        setLoading(false)
       
      } catch (error) {
          toaster.create({
             position:"top-left",
            description: "Left from Group",
            type: "error",               
                }) 
         setLoading(false)
      }  
       
      setGroupChatName("");
    }
    const handleRename = async() =>{
            if(!groupChatName) return
            try {
               setRenameLoading(true)
           const config = { 
            headers:{
              "content-type":"application/json",
              Authorization:`Bearer ${user.token}`,
            },
           }
           const {data} = await axios.put('/api/chat/rename',
            {chatId:selectedChat._id,
            chatName :groupChatName,
            },config
          );
          console.log(data._id);
     
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
  
            } catch (error) {
              toaster.create({
                position:"top-left",
                description: error.response.data.message,
                type: "warning",               
                }) 
              setRenameLoading(false)
            }
            setGroupChatName("")
    }
    const handleSearch = async(query) =>{
        setSearch(query)
         if(!query){
          return;
         }
         try {
         
          setLoading(true) 
           const config ={
            headers : {
               Authorization : `Bearer ${user.token}`
            },
           }  
           //console.log(`API Call: ${axios.defaults.baseURL}/api/findUsers?search=${search}`);
           const {data} =  await axios.get(`api/findUsers?search=${search}`,config)
           console.log(data)
           setLoading(false)
           setSearchResult(data)
           

         } catch (error) {
          toaster.create({
           position:"top-left",
           description: "Failed to search results",
           type: "Error",               
                }) 
          setLoading(false)       
         }
    }
    const handleAddUser = async(user1) =>{
      if(selectedChat.users.find((u)=>u._id === user1._id)){
         toaster.create({
          position:"top-left",
          description: "User already in group",
          type: "warning",               
                }) 
         return
      }
      if(selectedChat.groupAdmin._id !==user._id){
        toaster.create({
          description:"Only Admin has access to add Users",
          type:'error',
          placement:'top',
          isClosable:true,
          duration:4000
        })
        return
      }
      try {
         setLoading(true)
           const config = { 
            headers:{
             
              Authorization:`Bearer ${user.token}`,
            },
           }
           const {data} = await axios.put('/api/chat/groupAdd',{
            chatId:selectedChat._id,
            userId:user1._id
           },config)
           setSelectedChat(data)
           setFetchAgain(!fetchAgain)
           setLoading(false)
      } catch (error) {
        toaster.create({
          position:"top-left",
         description: "Error Occurred",
         type: "Error",               
                }) 
         setLoading(false)
      }


    }
  return (
    <> 
    <Box display='flex' alignItems='end' >        
        <DialogRoot>
      <DialogTrigger asChild>
  <Button variant="outline" size="sm">
       <Box display="flex" alignItems="center">    
          <TiThMenu />
        <Text ml="2">UpdateChat</Text>
    </Box>
  </Button>
  </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle 
          fontSize='3xl'
          fontFamily='cursive'
          fontSmooth='x-large'
          display='flex'
          justifyContent='center'
          > 

          {selectedChat.chatName}

          </DialogTitle>
        </DialogHeader>
        <DialogBody>
           <Box width='100%' d='flex' flexWrap='wrap' pb={3}>
             <Flex>
              {selectedChat.users.map((u) => (
                         <UserBadgeItem
                       key={u._id}
                        user={u}
                        handleFunction={() => handleRemove(u)}
                        />
              ))}
             </Flex>     
                        <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
      <Field mt={2} orientation="horizontal">
        <Input placeholder="Chat Name" flex="1" 
         value={groupChatName}
         onChange={(e) => setGroupChatName(e.target.value)}
        />
        <Button variant='Solid' bg='teal'
        isLoading={renameLoading}
        onClick={handleRename}
        >Update</Button>
      </Field>
      <Field orientation="horizontal" >
        <Input placeholder="Add Uses to Group" flex="1"
        onChange={e => handleSearch(e.target.value)}
         />
      </Field>    
    </Stack>      
  </Box>
  {loading ? (                  
                      <Spinner ml="auto" d="flex" />
                      ) :(         
                   searchResult?.slice(0,4).map((user) =>(
                       <UserListItem 
                        key={user._id}
                        user={user}
                        handleFunction={()=> handleAddUser(user)}         
                       />
                   ))) 
                   }        
</DialogBody>
        <DialogFooter>
          <DialogActionTrigger >            
          </DialogActionTrigger>
          <Button
          onClick = {()=>handleRemove(user)} 
          bg='red'
          >Leave Group</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
        </DialogRoot>
    </Box>       
    </>
  )
}

export default UpdateGroupChatModel
