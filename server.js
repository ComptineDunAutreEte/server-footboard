/*var express = require('express');
var http = require('http')
var socketio = require('socket.io');

var app = express();
var server = http.Server(app);
var websocket = socketio(server);
server.listen(3000, () => console.log('listening on *:3000'));

var sessions = [];

/*
// The event will be called when a client is connected.
websocket.on('connection', (socket) => {

    console.log('A client just joined on', socket.id);

    socket.on('add-user', (message) => {
        if (sessions.length === 3) {
            socket.emit('message', 'Trop du monde');
        } else if (sessions.length < 3) {
            sessions[message.username] = {
                "socket": socket.id
            };
            console.log("final", sessions);
        }

    });
    socket.emit('connection', 'Welcome');
});*/


var http = require('http');
var fs = require('fs');
var Session = require('./session');
// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);
var session = new Session();
// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function(socket) {
    console.log('Un client est connecté !');
    socket.on('login', (message) => {
        console.log(message);
        if (session.add(message.team, message.pseudo, socket)) {
            socket.emit('login', 'Bienvenue dans la team ' + message.team + ' ' + message.pseudo);
        } else {
            socket.emit('login', 'Désolé mais l\'équipe ' + message.team + ' est pleine');
        }
        socket.emit('table', session.getTab());
    });

    socket.on('disconnect', (reason) => {
        console.log('disconnected : ' + reason);
        session.remove(reason.team, reason.pseudo);
    });
});


server.listen(process.env.PORT || 3000);