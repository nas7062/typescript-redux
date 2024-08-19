    import { Server } from 'socket.io';
    import express from "express";
    import * as http from "http";
    // import ViteExpress from "vite-express";
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server, {
        path: "/socket.io/", 
        cors: {
            origin: "https://10012-trd.vercel.app",
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type", "Authorization"]
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
   
    const PORT = process.env.PORT || 3000;

    server.listen(PORT, () => {
        console.log(`서버 연결.. 포트 ${PORT}`);
    });


// ViteExpress.bind(app,server);