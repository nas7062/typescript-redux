import { io, Socket } from "socket.io-client";
import store from "../store/store";
import { SetIsConnect,AddMessage } from "../reducer/ChatSlice";

let socket :Socket | null = null;

export const ConnectToServer = (username:string) =>{
    if(!socket){
        socket =io('http://localhost:3000',{
            autoConnect :false,
            query :{username},
        });
        socket.connect();

        socket.on('connect',()=>{
            store.dispatch(SetIsConnect(true));
        })
        socket.on('disconnect',()=>{
            store.dispatch(SetIsConnect(false));
        })
        socket.on('new message' ,(msg)=>{
            store.dispatch(AddMessage(msg));
        });
    }
};

export const disconnectFromServer = () =>{
    if(socket)
    {
        socket.disconnect();
        socket = null;
    }
}
export const SendMessage = (usename:string,message:string) =>{
    if(socket){
        socket.emit('new message',{usename:usename,message:message},(reponse:string)=>{
            console.log(reponse);
        } )
    }
}