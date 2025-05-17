import { useState } from "react"
import axios, {isAxiosError} from "axios"
import { useNavigate } from "react-router"

import { Input } from "./Input"
import { Button } from "./Button"
import {AnimatePresence, motion} from "framer-motion"
import { Message } from "./Message"


export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success"|"error"|"info">("error");
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const messageVisibility = () => {
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 3000);
  }

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login",{
        email,
        password
      },{
        withCredentials: true,
      });
      console.log(res.data);
      messageVisibility();
      navigate("/home");
    } catch (error) {
      if(isAxiosError(error)) {
        setMessage(error.response?.data.message);
        setMessageType("error");
        console.log(message)
      }
      messageVisibility();
      console.error("Error during login:", error);
    }
  }

  return (
    <>
      <motion.div 
        initial={{opacity: 0, scale:0}} 
        animate={{opacity: 1, scale:1}} 
        transition={{duration:0.2, scale:{type:"spring", visualDuration:0.4, bounce:0.2}}} 
        className="p-40 bg-[url(../src/assets/blob-haikei.svg)] bg-no-repeat bg-center flex flex-col items-center justify-center gap-2">
          <h1 className="text-4xl text-center font-bold my-8">Login</h1>
          <form onSubmit={onLogin} className="flex flex-col items-center">
            <Input type="email" name="email" label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input type="password" name="password" label="Password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button text="SIGN IN" type="submit" disabled={false}/>
          </form>
      </motion.div>
      <AnimatePresence>
        {isMessageVisible && <Message type={messageType}>{message}</Message>}
      </AnimatePresence>
    </>
  )
}
