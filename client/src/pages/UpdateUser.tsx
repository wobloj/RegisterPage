import { useState } from "react"
import axios from "axios"
import {motion} from "framer-motion"

import { Input } from "../components/Input"
import { Button } from "../components/Button";
import useFetchUser from "../features/useFetchUser";

export const UpdateUser = () => {
    const [username, setUsername] = useState<string>("");
    const {user, isLoading, error} = useFetchUser();

    const handleUserUpdate = async (e:React.FormEvent) =>{
        e.preventDefault();
        if(!user) return;

        try {
            const res = await axios.patch(`http://localhost:5000/users/${user._id}`,{username},{
                withCredentials: true,
            })
            console.log("user updated:", res.data);
        } catch (error) {
            console.error("Error updating user:", error);
            
        }
    }

    if(isLoading) {
        return (
            <div className="flex flex-col items-center justify-center">
                <p className="text-indigo-500 font-bold text-4xl my-4 text-center">Loading...</p>
            </div>
        )
    }

    if(error || !user){
        return(
            <div className="flex flex-col items-center justify-center">
                <p className="text-red-500 font-bold text-4xl my-4 text-center">
                    {error || "User not found"}
                </p>
            </div>
        )
    }

  return (
    <>
        <motion.form
         initial={{opacity:0}}
         animate={{opacity:1}}
         onSubmit={handleUserUpdate}
         className="bg-[url(../src/assets/blob-haikei.svg)] bg-no-repeat bg-center flex flex-col items-center justify-center w-[600px] h-[600px] p-10 ">
            <Input type="text" name="ID" label="ID" value={user._id} disabled={true} readOnly={true}/>
            <Input type="text" name="Email" label="Email" value={user.email} disabled={true} readOnly={true}/>
            <Input type="text" name="Username" label="Username" placeholder={user.username} value={username} onChange={(e) => setUsername(e.target.value)} disabled={false}/>
            <Button text="Update user" type="submit" disabled={false}/>
        </motion.form>
    </>
  )
}
