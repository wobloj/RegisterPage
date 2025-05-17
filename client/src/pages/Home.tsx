import axios, {isAxiosError} from "axios"
import { useState } from "react"

import { Button } from "../components/Button"
import { Table } from "../components/Table";
import {User} from "../types/user"
import { Message } from "../components/Message";

export const Home = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [message, setMessage] = useState<string>("");
    const [messageType, setMessageType] = useState<"success"|"error"|"info">("error");
    const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);

    const messageVisibility = () => {
      setIsMessageVisible(true);
      setTimeout(() => {
        setIsMessageVisible(false);
      }, 3000);
    }
    const fetchUsers = async () => {
        try {
            const res = await axios.get<User[]>("http://localhost:5000/users",{
                withCredentials: true,
              });
            setUsers(res.data);
            setMessage("Successfully fetched users");
            setMessageType("success");
            messageVisibility();
            console.log(users)
        } catch (error) {
            if(isAxiosError(error)) {
                setMessage(error.response?.data.message);
                setMessageType("error");
                messageVisibility();
            }
        }
    }

  return (
    <div className="h-screen w-screen">
        <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-indigo-500 font-bold text-4xl my-4">Home</p>
            <Button text="Fetch users" type="button" disabled={false} className="text-center whitespace-nowrap bg-indigo-500" onClick={fetchUsers}/>
        </div>
        <div className="flex flex-col justify-center items-center mt-8">
            {users.length > 0 && <Table data={users} />}
        </div>
        {isMessageVisible && <Message type={messageType}>{message}</Message>}
    </div>
  )
}
