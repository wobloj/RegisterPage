import { useEffect, useState } from "react";
import axios from "axios";

import {User} from '../types/User'
import { useUser } from "../context/UserContext";

export default function useFetchUser(){
    const [user, setUser] = useState<User|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null);

    const {userId} = useUser()

    const fetchUser = async () =>{
        setIsLoading(true);
            try {
                const res = await axios.get<User>(`http://localhost:5000/user/${userId}`,{
                    withCredentials: true,
                });
                console.log(res.data);
                setUser(res.data)
                setError(null);
            } catch (error) {
                console.error("Error fetching user:", error);
                setError("Failed to fetch user")
                setUser(null);
            } finally{
                setIsLoading(false);
            }
    }

    useEffect(()=>{
        fetchUser();
    },[]);

    return {user,isLoading,error,fetchUser}
}