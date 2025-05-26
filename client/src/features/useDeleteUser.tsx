import axios from "axios";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";

export default function useDeleteUser(){
    const {userId} = useUser();
    const navigate = useNavigate()
    const handleDelete = async () =>{
        try {
            const res = await axios.delete(`http://localhost:5000/users/${userId}`, 
                {withCredentials:true})
            console.log("User deleted: ", res)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return {handleDelete}
}