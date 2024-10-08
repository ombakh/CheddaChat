const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log("usr has connected");
    //listen for chat
    socket.on('chat message', (msg) => {
        socket.broadcast.emit(msg);
    })

    socket.on('disconnect', () => {
        console.log("usr has disconnected")
    })
})