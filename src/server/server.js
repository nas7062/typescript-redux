    import { Server } from 'socket.io';
    import express from "express";
    import * as http from "http";
    import ViteExpress from "vite-express";
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server,{
        cors :{
            origin: "*"
        }

    });

    io.on('connection', (client)=>{
        const username =client.handshake.query.username;
        console.log(`${username}가 들어왔습니다.`);

        client.broadcast.emit(`new message`,{username:"관리자" ,message:`${username}님이 들어왔습니다.`});

        client.on('new message',(msg)=>{
            console.log(`${username}님이 ${msg}를 보냈습니다`);
            io.emit('new message',{username: msg.username ,message:msg.message });
        })
        
        client.on('disconnect' ,()=>{
            console.log(`${username}가 나갔습니다`);
            io.emit(`new message`,{username:"관리자" ,message:`${username}님이 나갔습니다.`});
        })
    });

    server.listen( 5173, ()=>{
        console.log("서버 연결.. ,5173");
    });


    ViteExpress.bind(app,server);