import React from "react";
import { useState} from "react";
import { Input } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import { Button } from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";
import {FileUploadList,FileUploadRoot,FileUploadTrigger,} from "../components/ui/file-button"
import { HiUpload } from "react-icons/hi"
import { toaster } from "../components/ui/toaster";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function SignUp(){
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const[pic,setPic] = useState()
    const[Loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async() =>{
      setLoading(true)
       if(!name || !email || !password || !confirmPassword || pic){
          toaster.create({
               description : "please enter all fields",
               type:"error"

          })
          setLoading(false)
          return
       }
       if (password !== confirmPassword){
          toaster.create({
               description : "password didn't match",
               type:"warning"
          })
          return
       }
       try{
          const config = {
               headers : {
                    "content-type" : "application/json"
               }
          }   
           const {data} = await axios.post('/api/user',
               {name,email,password,pic}
           )
           toaster.create({
               description : "Registration Successful",
               type:"success"
          })
             localStorage.setItem("userInfo",JSON.stringify(data))
             navigate('/chat')
       }
       catch(err){
                 toaster.create({
               description : "Error Occured!!",
               type:"error"
          })
       }
    }
    return(
        <div>
           <form   onSubmit={(e) => {
           e.preventDefault();
           handleSubmit()
            } }>
               <Field label="Name" required helperText="">
                    <Input 
                    onChange={(e)=>setName(e.target.value)}                   
                    placeholder="Enter your name" />
               </Field>  

               <Field label="Email" required helperText="">
                    <Input 
                     onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter your email" />
                 </Field>
                 <Field label="Password" required helperText="">
                <PasswordInput 
                     onChange={(e)=>setPassword(e.target.value)}
                />
               </Field>
               
               <Field label="confirm password" required helperText="We'll never share your email.">
                  <PasswordInput
                         onChange={(e)=>setConfirmPassword(e.target.value)}/>   
               </Field> 
                   <br/>
               <Field label="Upload profile pic" >
                   <FileUploadRoot>
                      <FileUploadTrigger asChild>
                            <Button 
                            
                             accept="image/*"
                            onChange={(e) => setPic(e.target.value)}
                            variant="outline" size="sm">
                                   <HiUpload /> Upload file
                           </Button>
                     </FileUploadTrigger>
                     <FileUploadList />
                   </FileUploadRoot>    
               </Field> 
                <Button 
                     colorScheme='blue'
                     width='100%'
                     style={{marginTop:15}}
                     onClick={handleSubmit} 
                    //  isLoading = {picLoading}
                     >
                     SignUp

                </Button>                                              
        </form>
    </div>
    )
}
export default SignUp