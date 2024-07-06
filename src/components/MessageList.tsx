import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";



const MessageList:React.FC = () =>{
    const dialog = useSelector((state:RootState)=>state.chat.dialog);
    return (
        <ul>
            {dialog.map((msg,idx)=>(
                <li key={idx}>
                    {msg.username},{msg.message}
                </li>
            ))}
        </ul>
    );
}
export default MessageList;