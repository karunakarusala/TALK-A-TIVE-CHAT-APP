import React from 'react'
//import { Button } from "../components/ui/button"
import { Flex, Image } from "@chakra-ui/react"
import {
 
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Box,Text } from '@chakra-ui/react';
import { Button } from "../components/ui/button"
import { CgProfile } from "react-icons/cg";

//import { useDisclosure  } from '@chakra-ui/react';
function ProfileModel({user,children}) {
  //const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>   
    {/* {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : ( <></>
        //<IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )} */}
        <DialogRoot>
        
                <DialogTrigger asChild>
                  <Box display="flex" alignItems="center"  cursor="pointer">
                   <Flex display='flex' justifyContent='center' 
                   alignItems='center' flexDir='column' gap='10px'>
                     {/* <CgProfile /> */}
                    <Text ml={2} pl=''>{children}</Text>
                    </Flex>
                  </Box>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle alignContent='center' 
                    justifyContent='center' fontSize="3xl">
                      {user.name}                   
                    </DialogTitle>
                      <image 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdK_dnE_5cezDHypwWCPUwWlUQU0y4pwvyDA&s"/>

                   </DialogHeader>                  
                  <DialogBody 
                  display='flex'
                  flexDir='row'
                  alignItems='center'
                  justifyContent='center'
                  >
                 <Image 
                 borderRadius='full'
                 boxSize='150px'
                 alt='NO Image' 
                 src=
                 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdK_dnE_5cezDHypwWCPUwWlUQU0y4pwvyDA&s'/>                   
                  </DialogBody>
                  <DialogFooter>
                   <Text pr="40" fontSize='3xl'>   {user.email}</Text>
                    <DialogCloseTrigger asChild>
                      <Button variant="outline">Close</Button>
                    </DialogCloseTrigger>                   
                  </DialogFooter>
                </DialogContent>
              </DialogRoot>
    </>
  )
}

export default ProfileModel
