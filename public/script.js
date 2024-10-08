const socket = io();

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value;
    socket.emit('chat message', message);
    input.value = '';
}
socket.on('chat message', (msg) => {
    const li = document.createElement('li');
    li.textContent = msg;
    document.getElementById('messageInput').appendChild(li);
})