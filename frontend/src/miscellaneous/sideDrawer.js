
import {React,useState} from 'react';
import { Box, Button, IconButton, Text, Flex } from '@chakra-ui/react';
import { LuSearch } from "react-icons/lu";
import { Tooltip } from '../components/ui/tooltip';
import { useNavigate } from 'react-router-dom';
import { Input } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { CgProfile } from "react-icons/cg";
import { FaBell } from "react-icons/fa";
import { Avatar } from "../components/ui/avatar";
import { toaster } from '../components/ui/toaster';
import { Spinner } from '@chakra-ui/react';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../components/ui/menu";
import {
  DrawerActionTrigger,DrawerBackdrop,DrawerBody,DrawerCloseTrigger,DrawerContent,DrawerFooter,DrawerHeader,DrawerRoot,
} from "../components/ui/drawer"
import ProfileModel from './ProfileModel';
import axios from 'axios'
import ChatLoading from './chatLoading';
import { ChatState } from '../context/chatProvider';
import UserListItem from '../userAvatar/userListItems';
import { getSender } from '../config/chatLogic';
import { Badge } from "antd";

function SideDrawer() {
    const[search,setSearch] = useState()
    const[searchResult,setSearchResult] = useState([])
    const[loading,setLoading] = useState(false)
    const[chatLoading,setChatLoading] = useState(false)

    const { setSelectedChat,
    user,notification,
    setNotification,chats,
    setChats,} = ChatState()
    const navigate = useNavigate()
    const { isOpen, onClose } = useDisclosure();
    const [open, setOpen] = useState(false)
    
    const handleSearch = async() =>{
            if(!search){
                toaster.create({
                       position:"top-left",
                      description: "Please enter any contact to search",
                      type: "warning",               
                }) 
                return
            }
            try {
                 setLoading(true)
                 const config = {
                    headers :{
                        Authorization : `Bearer ${user.token}`
                    }
                 }
                 
                 const {data} = await axios.get(`api/findUsers?search=${search}`,config)                    
                   
                    setLoading(false)
                    setSearchResult(data)
                    
                  
            } catch (error) {
                toaster.create({
                       position:"top-left",
                      description: "Failed to Load the Search Results",
                      type: "error",               
                }) 
            }
    }
    const accessChat = async(userId) =>{  
      console.log("userId:",userId)   
      try {
           setChatLoading(true)
           const config = {
            headers:{
              "content-type":"application/json",
              Authorization:`Bearer ${user.token}`,
            },
           }
           const {data} = await axios.post(`/api/chat`,{userId},config);
             if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
             console.log(data)
             setSelectedChat(data);                 
             setChatLoading(false);
             onClose();  
                
           
      } catch (error) {
                          toaster.create({
                       position:"top",
                      description: "Error Fetching Data",
                      type: "warning",               
                }) 
        
      }
      
    }   
    const logout =()=>{
      navigate('/home')
    }

  return (  
    <> 
    <Box 
      w="100%"
      p="5px 10px"
      bg='#FFFAFA'
      borderWidth="5px"
    >   
      <Flex justifyContent="space-between" bg='' alignItems="center">
        <Tooltip  
          bg='green'
          content="Search here"
          hasArrow
          placement="bottom-end"
          openDelay={100} 
          closeDelay={200}
        >
          <Button onClick={() => setOpen(true)} 
          bg='' variant="ghost" display="flex" alignItems="center">
            {/* <IconButton aria-label="Search database" size="sm"> */}
              <LuSearch />
            {/* </IconButton>    */}
            Search here
          </Button>  
        </Tooltip>

        <Text fontSize="3xl" fontFamily='cursive' ml={4}>
          TALK-A-TIVE
        </Text>

    <Box borderRadius='none'>
    <Flex>
           <MenuRoot>
           <MenuTrigger>    

                         <Badge count= {notification.length || 0} overflowCount={99} showZero></Badge>

                       <Box mr='4' mt='1px' >
                          <FaBell/>
                        </Box>             
            <MenuContent pl='2'>
               {!notification.length && "no new Messages"}
               {notification.map((notify)=>(
                  <MenuItem key={notify._id} 
                  onClick={()=>{
                   setSelectedChat(notify.chat);
                   setNotification(notification.filter((n)=>n !== notify))
                  }}>
                     {notify.chat.isGroupChat?
                     `New Message in ${notify.chat.chatName}`
                     :`New Message from ${getSender(user,notify.chat.users)}`}
                  </MenuItem>
               )
               )}      
            </MenuContent>
             </MenuTrigger>       
           </MenuRoot>
           <MenuRoot display="flex" alignItems="center">                       
          <MenuTrigger >       
            <Box display="flex" alignItems="center">                                                               
              <Box>
                <Avatar size="xs" name="Sage" src="https://bit.ly/sage-adebayo" />
              </Box> 
              <Button variant="outline" size="sm">
                   Menu
              </Button>
            </Box>
          </MenuTrigger>          
           <MenuContent>
          
            <ProfileModel user={user}>
          <Box display='flex' justifyContent='space-between'>
            <Flex display='flex' flexDir='row' justifyContent='space-around' gap='5px'>
                   <CgProfile/>
              <Text pl='2' pt='1px'>Profile</Text>
            </Flex>
          </Box>
              
            </ProfileModel>  
            <MenuItem value="new-txt">          
            </MenuItem> 
            <MenuItem value="new-file" 
            onClick={logout}
            > LogOut</MenuItem>
          </MenuContent>
        </MenuRoot>    
    </Flex></Box>         
      </Flex>
    </Box>
          
    <DrawerRoot onClose={onClose} isOpen={isOpen} bg="#F0F8FF" placement="left" open={open} onOpenChange={(e) => setOpen(e.open)}>
               <DrawerBackdrop />
            <DrawerContent >
                <DrawerHeader m="4" >
                <Text mb='6' ml='2' fontSize='2xl'>Search Contact</Text>         
                  <Flex align="center" gap="2">         
                      <Input placeholder="Search contact"  value={search}
                          onChange={
                              (e) =>setSearch(e.target.value)
                          }
                      />
                      <Button variant="ghost" onClick={handleSearch}>Go</Button>
                  </Flex>
             </DrawerHeader>
           
             <DrawerBody>
                {loading ? ( 
                  
                <ChatLoading/>
                ) :(         
             searchResult?.map((user)=>(
                 <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={()=> accessChat(user._id)}         
                 />
             ))) 
             }
                {chatLoading && <Spinner ml="auto" d="flex" />}
             </DrawerBody>         
             <DrawerFooter>
               <DrawerActionTrigger asChild>
                 <Button variant="outline">Exit</Button>
               </DrawerActionTrigger>               
             </DrawerFooter>
             <DrawerCloseTrigger />
           </DrawerContent>
      </DrawerRoot>
</>
  );
}

export default SideDrawer;
