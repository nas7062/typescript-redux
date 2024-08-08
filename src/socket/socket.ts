import { io, Socket } from "socket.io-client";
import store from "../store/store";
import { SetIsConnect, AddMessage } from "../reducer/ChatSlice";

let socket: Socket | null = null;

export const ConnectToServer = (username: string) => {
    if (!socket) {
        socket = io("https://10012-trd.vercel.app", {
            autoConnect: false,
            path: "/socket.io/",
            query: { username },
            transports: ['websocket']
        },

        );
        socket.connect();

        socket.on('connect', () => {
            console.log('Connected to server');
            store.dispatch(SetIsConnect(true));
        })
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            store.dispatch(SetIsConnect(false));
        })
        socket.on('new message', (msg) => {
            console.log('Received new message:', msg);
            store.dispatch(AddMessage(msg));
        });
    }
    return socket;
};

export const disconnectFromServer = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}
export const SendMessage = (username: string, message: string) => {
    if (socket) {
        socket.emit('new message', { username, message }, (reponse: string) => {
            console.log(reponse);
        })
    }
}