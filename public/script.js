const socket = io();

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value;
    if (message.trim() !== '') {
        socket.emit('chat message', message);
        addMessage(message);
        input.value = '';
    }
}

function addMessage(msg) {
    const li = document.createElement('li');
    li.textContent = msg;
    document.getElementById('messages').appendChild(li);
}

socket.on('chat message', (msg) => {
    addMessage(msg);
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color;
}

document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});