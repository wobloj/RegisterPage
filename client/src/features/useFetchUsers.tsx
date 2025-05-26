import axios from "axios";
import { useState } from "react";
import { isAxiosError } from "axios";
import { User } from "../types/User";
import { useMessage } from "../hooks/useMessage";

export default function useFetchUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {showMessage, MessageComponent} = useMessage();

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get<User[]>("http://localhost:5000/users", {
                withCredentials: true,
            });
            setUsers(res.data);
            showMessage("Users fetched successfully", "success");
        } catch (error) {
            if (isAxiosError(error)) {
                showMessage(error.response?.data.message || "Failed to fetch users", "error");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { users, isLoading, MessageComponent, fetchUsers };
}