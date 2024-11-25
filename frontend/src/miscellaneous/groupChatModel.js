import React from 'react'
import { useState } from 'react'
import { Box, Button, Flex, Spinner } from '@chakra-ui/react'
import { toaster } from '../components/ui/toaster'
import { useDisclosure } from '@chakra-ui/react'
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input, Stack } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import { ChatState } from '../context/chatProvider'
import axios from 'axios'
import UserListItem from '../userAvatar/userListItems'
import UserBadgeItem from '../userAvatar/UserBadgeItem'

function GroupChatModel({children}) {
  const {isOpen,onOpen,onClose} =useDisclosure()  
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const {user,chats,setChats} = ChatState()
  

  const handleSearch = async(query) =>{
        setSearch(query)
         if(!query){
          return;
         }
         try {
          console.log("hello")
          setLoading(true) 
           const config ={
            headers : {
               Authorization : `Bearer ${user.token}`
            },
           }  
           console.log(`API Call: ${axios.defaults.baseURL}/api/findUsers?search=${search}`);
           const {data} =  await axios.get(`api/findUsers?search=${search}`,config)
           console.log(data)
           setLoading(false)
           setSearchResult(data)
           console.log(data)
           console.log(searchResult)

         } catch (error) {
          toaster.create({
            description : 'failed to load the search Results',
            type :"error",
            duration :'2000',
            isClosable:true,
            placement : 'bottom-end'
          })         
         }
  }
  const handleSubmit = async() =>{
            if (!groupChatName && !selectedUsers){
              toaster.create({
           position:"top-left",
           description: "Please fill all fields i.e Group name and selects atleast two users",
           type: "warning",               
                }) 
              return
            }
            try {
              const config ={
            headers : {
               Authorization : `Bearer ${user.token}`
            },
           }  
           const {data} =  await axios.post('/api/chat/group',{
            name: groupChatName,
            users:JSON.stringify(selectedUsers.map((u)=>u._id)),
           },
           config
          )
           setChats([data,...chats]);
           onClose()
           toaster.create({
                     position:"top",
                     description: "New Group created Successfully",
                     type: "success",               
                }) 
            } catch (error) {
               toaster.create({
           position:"top",
           description: "Failed to create Group",
           type: "error",               
                }) 

  }}
  const handleGroup = (userToAdd) =>{
        if(selectedUsers.includes(userToAdd)){
                 toaster.create({
                  type : "warning",
                  description:"User already added",
                  placement :"top",
                  duration:"4000",
                  isClosable : true,
                 }) 
                 return
        }
          setSelectedUsers([...selectedUsers,userToAdd])
  }
  const handleDelete = (delUser) =>{
     setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  }
  return (
    <>
      <Box bg=''>
          <DialogRoot>
            <DialogTrigger 
          
             isOpen={isOpen} onClose={onClose} asChild>
              <span onClick={onOpen} variant="outline"  height='80vh' >
                {children}
              </span>
            </DialogTrigger>
          <Box  >
            <DialogContent>
              <DialogHeader>
                <DialogTitle 
                fontSize='25px' fontFamily='sans-serif' 
                display='flex' justifyContent='center' alignItems='center'
                >Create Group Chat</DialogTitle>
              </DialogHeader>
              <DialogBody display='flex' 
              flexDir='column' alignItems='center       
              '>
               <Stack gap="4" maxW="xl" 
               css={{  "--field-label-width": "30px" }}
               >      
                  <Field mt='2' ml='2' mr='12' orientation="horizontal">
                    <Input  placeholder="Chat Name"
                    onChange={(e)=>setGroupChatName(e.target.value)} />
                  </Field>  
                  <Field ml='2' mb='4' mr='12' orientation="horizontal" >
                    <Input placeholder="add users eg:'karna' 'mahadev' " 
                    flex="1"
                    onChange= {(e) =>handleSearch(e.target.value)} />
                  </Field>            
            </Stack>
              <Box d="flex" flexWrap="wrap" 
                       justifyContent="start"    
                       alignItems="center">
               <Flex  pb={3}
          px={3} justifyContent="space-between"
          alignItems="center"
          w="100%" >
                               {selectedUsers.map((u) => (
                         <UserBadgeItem
                       key={u._id}
                        user={u}
                        handleFunction={() => handleDelete(u)}
                        />
              ))}</Flex>
             </Box>
                 {loading ? (                  
                      <Spinner ml="auto" d="flex" />
                      ) :(         
                   searchResult?.slice(0,4).map((user) =>(
                       <UserListItem 
                        key={user._id}
                        user={user}
                        handleFunction={()=> handleGroup(user)}         
                       />
                   ))) 
                   }               
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger>
                </DialogActionTrigger>
                <Button bg='blue' 
                onClick={handleSubmit}
                >Create Chat</Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
           </Box>
          </DialogRoot>
      </Box>
    </>
  )
}

export default GroupChatModel
