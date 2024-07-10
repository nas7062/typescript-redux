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
    console.log(`${client.handshake.query.username}가 들어왔습니다.`);

    client.broadcast.emit(`new message`,{username:"관리자" ,message:`${client.handshake.query.username}님이 들어왔습니다.`});

    client.on('new message',(msg)=>{
        console.log(`${client.handshake.query.username}님이 ${msg}`);
        io.emit('new message',{username: msg.username ,message:msg.message });
    })
    
    client.on('disconnect' ,()=>{
        console.log(`${client.handshake.query.username}가 나갔습니다`);
        io.emit(`new message`,{username:"관리자" ,message:`${client.handshake.query.username}님이 나갔습니다.`});
    })
});

server.listen( 3000, ()=>{
    console.log("서버 연결.. ,3000");
});

app.get("/message", (res)=>res.send("hello express!"));
app.get("/api", (res)=> res.send("hello api!"));

ViteExpress.bind(app,server);