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
var question = require('./question-collectif/question-collectif');
var questionv2 = require('./question-collectif/question-collectif-v2');
var path = require('path');
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
    console.log('connected');
    socket.on('login', (message) => {
        //console.log('login');
        if (message.type === 'tablet') {
            if (session.add(message.data.team, message.id, socket)) {
                console.log('connected');
                socket.join('navigate');
                socket.join('send-question-collectif');
                socket.join('send-question-collectif-v2');
                socket.emit('navigate', 'Home');

                socket.join("simple-question");
            }
        } else { //cas ou c'est la table
            //console.log('ici')
            session.table = socket;
            socket.emit('start-question-collectif', '');
            socket.on('video-resume-question-collectif', (message) => {
                io.emit('navigate', 'QuestionCollectif')
                    //socket.emit('navigate', 'QuestionCollectifV2');
                    //session.nextSessionA().emit('question-collectif', question.firstQuestion());
            });

        }
        /*console.log(message);
        if (session.add(message.team, message.id, socket)) {
            fs.readFile('./img_question.png', function(err, data) {
                //console.log(data);
                //socket.emit('imageConversionByClient', { image: true, buffer: data });
                socket.emit('img', "data:image/png;base64," + data.toString("base64"));
            });
            socket.emit('question-collectif-waiting', 'Attendez votre tour');
            if (session.estCompletA()) {
                session.nextSessionA().emit('question-collectif', question.firstQuestion());
            }
            // socket.emit('login', 'Bienvenue dans la team ' + message.team + ' ' + message.pseudo);
        } else {
            socket.emit('login', 'Désolé mais l\'équipe ' + message.team + ' est pleine');
        }
        if (session.getTableSession() !== null) {
            session.getTableSession().emit('table', session.getTab());
        }*/
    });

    socket.on('question-collectif-request', (reason) => {
        console.log(reason);
        socket.emit('navigate', 'QuestionCollectif');
    });

    socket.on('question-collectif-request-v2', (reason) => {
        console.log(reason);
        socket.emit('navigate', 'QuestionCollectifV2');
        //socket.emit('ask-question-collectif-request-v2', questionv2.situation);

    });

    socket.on('ask-question-collectif-request-v2', (reason) => {
        console.log(questionv2.answers[0]);
        socket.emit('ask-question-collectif-request-v2', questionv2.situation);
        socket.emit('answers-question-collectif-request-v2', questionv2.answers[0]);
    });

    socket.on('question-collectif', (reason) => {
        let quest = question.answer(reason);
        if (quest !== null) {
            session.nextSessionA().emit('question-collectif', quest);
        }
        //console.log("Reponse ", reason);
    });

    socket.on("ready", (isReady) => {
        console.log(isReady);
        socket.on("simple-question", (response) => {
            console.log(response);
            socket.emit('navigate', 'Question');
        });
    });




    socket.on('reset', (reason) => {
        session.reset();
    });

    socket.on('loginTable', (reason) => {
        console.log('la table est connecté');
        session.setTableSession(socket);
        session.getTableSession().emit('table', session.getTab());
    });

    socket.on('table', (reason) => {
        console.log('la table: ' + reason);
    });

    socket.on('disconnect', (reason) => {
        console.log('disconnected : ' + reason);
        session.remove(reason.team, reason.id);
    });
});


server.listen(process.env.PORT || 3000);