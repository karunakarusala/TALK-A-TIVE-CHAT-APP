import { useState } from "react"
import { Input } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import { Button } from "@chakra-ui/react"
import { PasswordInput } from "../components/ui/password-input"
import { toaster } from "../components/ui/toaster"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function Login() {
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const navigate = useNavigate()
  const handleSubmit = async() =>{
         if(!email || !password){
          toaster.create({
            description : "please enter all fields",
            type : "warning"
          }) 
         return
        }
         try{
          const config = {
               headers : {
                    "content-type" : "application/json"
               }
          }   
           console.log("Sending data:", { email, password });
           const {data} = await axios.post('/api/login',

               {email,password},
              config
           )
           toaster.create({
               description : "login Successful",
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
  return (
    <div>    
    <form  
    onSubmit={(e) =>{
      e.preventDefault();
      handleSubmit()
    }
    }    
    > 
        <Field label="Email" required helperText="We'll never share your email.">
           <Input 
           onChange={e => setEmail(e.target.value)}
           placeholder="Enter your email" />
        </Field>
        <Field label="password" required helperText="We'll never share your email.">
                <PasswordInput
                             onChange={e => setPassword(e.target.value)}
                />
         </Field>
         <Button
         
                width='100%'
                style={{marginTop:15}}
                onClick={handleSubmit}
         >Login</Button>
    </form>
    </div>
    
  )
}
export default Login
