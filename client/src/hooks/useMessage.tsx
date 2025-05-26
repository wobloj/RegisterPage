import{ JSX, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Message } from "../components/Message";
import { MessageType } from "../types/Message";

interface IUseMessage{
    message: string;
    messageType: MessageType;
    isMessageVisible: boolean;
    showMessage: (message: string, type: MessageType) => void;
    MessageComponent:() => JSX.Element | null;
}

export const useMessage = (): IUseMessage => {
    const [message, setMessage] = useState<string>("");
    const [messageType, setMessageType] = useState<MessageType>("error");
    const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);

    const showMessage = (message: string, type: MessageType) => {
        setMessage(message);
        setMessageType(type);
        setIsMessageVisible(true);
        setTimeout(() => {
            setIsMessageVisible(false);
        }, 3000);
    }

    const MessageComponent = () =>{
        return isMessageVisible ? (
            <AnimatePresence>
                <Message type={messageType}>
                    {message}
                </Message>
            </AnimatePresence>
        ):null;
    }

    return{
        message,
        messageType,
        isMessageVisible,
        showMessage,
        MessageComponent
    }
}