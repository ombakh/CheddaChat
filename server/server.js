const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// serve static files from public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

//generates random hexadecimal color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

io.on('connection', (socket) => {
    console.log("User has connected");
    const userColor = getRandomColor();
    socket.on('chat message', (msg) => {
        // sends message to other users
        socket.broadcast.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log("User has disconnected");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});