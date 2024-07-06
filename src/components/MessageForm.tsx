import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { SendMessage } from "../socket/socket";
import { SetMessage, SetUsername } from "../reducer/ChatSlice";


const MessageForm :React.FC = () =>{

    const dispatch = useDispatch();
    const {username,message} =useSelector((state:RootState)=>state.chat);
    const SendMessageHandler = () => {
        SendMessage(username, message);
      };
    
      const UsernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SetUsername(e.target.value));
      };
    
      const MessageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SetMessage(e.target.value));
      };
      return (
        <div>
          <input type="text" value={username} onChange={UsernameChangeHandler} placeholder="Username"/>
          <input type="text" value={message} onChange={MessageChangeHandler} placeholder="Message"/>
          <button onClick={SendMessageHandler}>보내기</button>
        </div>
      );
}

export default MessageForm;