import React, { useState,useEffect } from 'react';
import { Container, Box, Text, Tabs } from '@chakra-ui/react';
import Login from '../Auth/login'; // Ensure Login is capitalized
import SignUp from '../Auth/signup'; // Ensure SignUp is capitalized
import { useNavigate } from 'react-router-dom';
function Homepage() {
     const navigate = useNavigate()

     useEffect(() =>{
        const user = JSON.parse(localStorage.getItem("userInfo"))
        //  setUser(userInfo)

         if(user){
            navigate('/home')
         }
     },[navigate])
 
  const [data, setData] = useState("login"); // State to track which form is active

  const loginForm = () => {
    setData("login"); // Set data to "login" to show Login component
  };

  const signUpForm = () => {
    setData("signup"); // Set data to "signup" to show SignUp component
  };

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p="3"
        bg="white"
        width="100%"
        m="20px 0px 15px 20px"
        border="2px"
        borderWidth="1px"
        margin="20px"
>
        <Text fontSize={25}>Talk-A-Tive</Text>
      </Box>

      <Box  w="100%" bg="white" pl="0px">
        <Tabs.Root defaultValue="members">
          <Tabs.List display="flex" 
          alignItems='end'
          justifyContent="space-around">
            <Tabs.Trigger 
            width='100%'
            pl='90px'
            // borderRadius='5px'
            // p='2px 20px 0 20px'
            bg= '#eff6ff'
            value="members" >
              <button onClick={loginForm}
               
              >Login</button>
            </Tabs.Trigger>
            <Tabs.Trigger 
            bg='#eff6ff'
            width='100%'
            pr="90px" 
            value="projects" asChild>
              <button onClick={signUpForm}>SignUp</button>
            </Tabs.Trigger>
          </Tabs.List>

          <Box mt="20px" w="100%" p='4' pr='100px' display="flex" justifyContent="center" bg="white" >
            {data === "login" && <Login />} {/* Conditionally render Login component */}
            {data === "signup" && <SignUp />} {/* Conditionally render SignUp component */}
          </Box>
        </Tabs.Root>
      </Box>
    </Container>
  );
}

export default Homepage;
