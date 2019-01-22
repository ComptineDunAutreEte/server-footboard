const app = require('express')();
const http = require('http').Server(app);
const port = 3000;
const io = require('socket.io')(http);
const channels = require("./model/channels");

const WebSocketController = require("./controller/websocket.controller");
const webSocketController = new WebSocketController();

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on(channels.connection, (socket) => webSocketController.onConnect(socket));

http.listen(port, () => {
    console.log('listening on *:3000');
});

