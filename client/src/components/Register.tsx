import { useState } from "react"
import axios, { isAxiosError } from "axios"
import { motion, AnimatePresence } from "framer-motion";

import {Input} from "./Input";
import { Button } from "./Button";
import { Message } from "./Message";


export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [messageType, setMessageType] = useState<"error"|"success"|"info">("error");
  const [message, setMessage] = useState<string>("");
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);

  const messageVisibility = () => {
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 3000);
  }

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/auth/register",{
        email,
        username,
        password
      },{
        withCredentials: true,
      },);
      setMessage("Registration successful");
      setMessageType("success");
      messageVisibility();
      console.log("Register successful:", res.data);
    }catch (error) {
      if(isAxiosError(error)) {
        setMessage(error.response?.data.message);
        setMessageType("error");
        console.log(message)
      }
      messageVisibility();
      console.error("Error during registration:", error);
    }
  }


  return (
    <>
    <motion.div 
    initial={{opacity: 0, scale:0}} 
    animate={{opacity: 1, scale:1}}
    transition={{duration:0.2, scale:{type:"spring", visualDuration:0.4, bounce:0.2}}}
    className="px-40 py-[78px] bg-[url(../src/assets/blob-haikei.svg)] bg-no-repeat bg-center">
      <h1 className="text-4xl text-center font-bold my-8">Register</h1>
        <form onSubmit={onRegister} className="flex flex-col justify-center items-center gap-2">
            <Input type="email" label="Email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input type="text" label="Username" name="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Input type="password" label="Password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Input type="password" label="Repeat password" name="password" placeholder="Enter your password again" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
            <Button text="SIGN UP" type="submit" disabled={false}/>
        </form>
    </motion.div>
    <AnimatePresence>
        {isMessageVisible && <Message type={messageType}>{message}</Message>}
      </AnimatePresence>
  </>
  )
}
