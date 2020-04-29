var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
var messages = [];

console.log('websockets server started');

ws.on('connection', function (socket) {
    console.log('client connection established');
    // reads past messages here (array)
    messages.forEach(function (msg) {
        // outputs here
        socket.send(msg);
    });
    
    socket.on('message', function (data) {
        console.log('message received: ' + data);
        messages.push(data); // pushes msg to message array
        // send to all users here
        ws.clients.forEach(function (clientSocket) {
            clientSocket.send(data)
        });
    });
});

