import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType{
    userId: string|null;
    username: string|null;
    setUserContext: (id: string, name:string) => void;
    clearUserContext: () => void;
}

interface UserProviderProps{
    children: ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({children}: UserProviderProps) =>{
    const [userId, setUserId] = useState<string|null>(null);
    const [username, setUsername] = useState<string|null>(null);

    const setUserContext = (id:string, name:string) =>{
        setUserId(id);
        setUsername(name);
    };

    const clearUserContext = () =>{
        setUserId(null);
        setUsername(null);
    };

    return (
        <UserContext.Provider value={{userId, username, setUserContext, clearUserContext}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context){
        throw new Error('useUser must be used within a UserProvider')
    }
    return context;
}