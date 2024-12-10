import { io, Socket } from "socket.io-client";
import store from "../store/store";
import { SetIsConnect, AddMessage } from "../reducer/ChatSlice";

let socket: Socket | null = null;

export const ConnectToServer = (username: string) => {
    if (!socket) {
        socket = io("https://your-ec2-13.59.107.97:3000", {
            autoConnect: false,
            path: "/socket.io/",
            query: { username }, // 서버에 보낼 쿼리 파라미터로 username을 설정.
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
        socket.disconnect(); // 소켓 서버와의 연결을 끊습니다.
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