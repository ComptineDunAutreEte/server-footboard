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

const Player = require("./model/player");
const easyQuestions = require('./data/questions/easy');

io.sockets.on('connection', function(socket) {
    console.log('connected');
    socket.on('login', (message) => {
        if (message.type === 'tablet') {
            const data = message.data;
            console.log(data);

            const player = new Player();
            player.pseudo = data.pseudo;
            player.uuid = message.uuid;
            player.team = data.team;
            player.level = data.userLevel;

            if (session.add(player, socket)) {
                //console.log(session);
                console.log('connected');
                socket.join('navigate');
                socket.join('send-question-collectif');
                socket.join('send-question-collectif-v2');
                socket.join('reset');
                socket.emit('navigate', 'Home');
                socket.join("simple-question");
                socket.on('ready-question-collectif-v2', (message) => {
                    socket.emit('ask-question-collectif-request-v2', questionv2.situation);
                    questionv2.ready += 1;
                    if (questionv2.ready === 3) {
                        let sessions = session.getTeam('A');
                        let index = 0;
                        for (let session of sessions) {
                            //session.emit('');
                            socket.emit('answers-question-collectif-request-v2', questionv2.answers[index]);
                            index += 1;
                        }
                    }
                });
            }
        } else { //cas ou c'est la table
            console.log('ici-table')
            session.table = socket;
            //socket.emit('start-question-collectif', '');
            socket.on('video-resume-question-collectif', (message) => {
                io.emit('navigate', 'QuestionCollectif');
                //socket.emit('img', "data:image/png;base64," + data.toString("base64"));

                //console.log('pause-resume');
                //socket.emit('navigate', 'QuestionCollectifV2');
                //session.nextSessionA().emit('question-collectif', question.firstQuestion());
            });
            socket.on('question-collectif-ready', (message) => {
                fs.readFile('./img_question.png', function(err, data) {
                    //console.log(data);
                    //socket.emit('imageConversionByClient', { image: true, buffer: data });
                    socket.emit('img', "data:image/png;base64," + data.toString("base64"));
                });
                //socket.emit('img', "data:image/png;base64," + data.toString("base64"));
                //console.log('pause-resume');
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


    // indiv Question Communication
    const indivQuestionChannel = "indivQuestion";

    socket.on(indivQuestionChannel, (msg) => {
        if (msg.data === "ready") {
            io.emit("waitingScreen", {isReady: true});
        }
    });

    isEverybodyReady(socket);
    retrieveSimpleQuestionResponse(socket);

    socket.on('reset', (reason) => {
        questionv2.ready = 0;
        console.log('reset');
        console.log('SIZE ', session.getTeam('A').players.size);
        session.reset();
        console.log('SIZE ', session.getTeam('A').players.size);
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
        // session.remove(reason.team, reason.id);
    });
});

function isEverybodyReady(socket) {
    let isEverybodyReady = true;

    socket.on("ready", (response) => {
        console.log(response);

        const uuid = response.uuid;

        updateUser(uuid, true);

        if (session.getPlayer(uuid).isReady) {
            session.teams.forEach((team) => {
                team.players.forEach((player) => {
                    if (!player.isReady) {
                        isEverybodyReady = false;
                    }
                });
            });
        }

        if (isEverybodyReady) {
            io.emit("ask-simple-question", {
                isEverybodyReady: true,
                question: easyQuestions[0]
            });

            updateUser(uuid, true);
        }
    });
}

function retrieveSimpleQuestionResponse(socket) {
    socket.on("ask-simple-question", (response) => {
        console.log(response);
        const data = response.data;

        let isCorrectPlayerResponse = false;

        const player = session.getPlayer(response.uuid);

        easyQuestions.forEach((question) => {
            if (question.id === data.questionId) {
                question.responses.forEach((res) => {
                    if (res.id === data.userResponse && res.isValid) {
                        isCorrectPlayerResponse = true;
                    }
                });
            }
        });

        console.log(isCorrectPlayerResponse);

        socket.emit("indivQuestion", {msg: isCorrectPlayerResponse});
    });
}

function updateUser(uuid, isReady) {
    session.getPlayer(uuid).isReady = isReady;
}


server.listen(process.env.PORT || 4000);