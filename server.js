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
var io = require('socket.io').listen(server, {
    // below are engine.IO options
    pingInterval: 15000,
    pingTimeout: 10000
});
var session = new Session();
// Quand un client se connecte, on le note dans la console

//==================Partie générale===============================
function getMessage(_code = 0, _data = null, type = '') {
    let message = {
        code: _code,
        type: '',
        data: _data,
    };
    return message;
}

function sendToOne(_data, socket, channel, _code = 0) {
    let message = getMessage(0, _data, '');
    socket.emit(channel, message);
}

function sendToAll(room, _data, chanel) { //faut faire une join au préalable
    console.log(room, chanel);
    let message = getMessage(0, _data, '');
    io.to(room).emit(chanel, message);

}
//==================Fin Partie générale===============================



//==================Partie de Long=====================================

let room = {
    question_parrallel: "question-parrallel", //code 30
    question_sequentiel: "question-sequentiel", //code 40
    navigate: "navigation", //code 20
    ready: "ready",
    team_A: "team_A",
    team_B: "team_B"
};

function join_rooms(socket, team) {
    socket.join(room.navigate);
    socket.join(room.question_parrallel);
    socket.join(room.question_sequentiel);
    socket.join(room.ready);
    socket.join(room.qst_screen);
    if (team === 'A') {
        console.log('team_A');
        socket.join(room.team_A);
    } else {
        socket.join(room.team_B);
    }

}

function socket_server_on(socket) {}

function question_handler_seq() {

}

function question_hanndler_par() {

}

/**
 * Protocol: cas question séquentiel
 * la table prévient qu'il a une question:
 * 
 * table send: navigate 
 * tablette receive: navigate (changer la page)//prévenir l'utilisateur a regarder son écran
 * 
 * tablette send: request_question 
 * table receive: request_question
 * 
 * table send: question
 * tablette receive: question
 * 
 * tablette send: ready_data
 * table receive: ready_data
 * 
 * Lorque la vidéo est fini de jouer: 
 * //aucune interaction avec la table possible, previent l'utilisateur de regarder la tablette
 * 
 * table send: video_pause
 * tablette receive: video_pause => bouton are you ready apparaitre 
 * 
 * tablette send: ready_to_answer 
 * table receive: ready_to_answer //wait for all
 * table send: start_answer
 * 
 * tablette send_answer
 * 
 */
function question_collectif_seq(socket) {

    socket.on('ready-seq', message => {
        console.log(message);
        if (message.team === 'A') {
            sendToOne('', socket, 'question-screen');
            // console.log(session.nextSessionA());
            //socket.emit('question-collectif-par', question.firstQuestion());
            if (question.add_ID_A(message.uuid, socket)) {
                let sock = question.get_next_session_team_A();
                console.log('hello');
                sock.emit('question-collectif-par', question.firstQuestion());
                //sendToAll(room.team_A, '', 'question-screen');
                //let id = question.get_next_ID_from_team_A();
                // send to all puis 
                //let p = session.getPlayer(id);

                // sendToOne('', socket, 'question-screen');
            }
        } else {

        }

        //test on doit stocker id à la place
    });

    socket.on('question-collectif-seq-answer', message => {
        console.log(message.data);
        let quest = question.answer(message.data);
        console.log('answer bback ', quest);
        if (quest !== undefined) {
            let sock = question.get_next_session_team_A();
            sock.emit('question-collectif-par', quest);
            // session.nextSessionA().session.emit('question-collectif', quest);
        } else {
            //console.log('wait-screen');
            sendToAll(room.team_A, '', 'wait-screen');
            sendToOne('', session.table, 'back-to-video', 0);
        }
        console.log('out-wait-screen');
    });
}

function question_collectif_par(socket) {
    console.log('question_collectif_par');
    socket.on('ready-par', message => {
        console.log('ready-par');
        socket.emit('ask-question-collectif-request-v2', questionv2.situation);
        socket.emit('answers-question-collectif-request-v2', questionv2.answers[0]);

        //stocker l'ID
    });

    socket.on('answer-par', message => {
        if (message.data.moveTo !== null) {
            message.data.uuid = message.uuid;
            sendToAll(room.team_A, message.data, 'moveTo');
        }
        console.log(message);
    });
}
//==================Fin Partie de Long=================================

let nQuestionCounter = 0;
const playersResponsesInformations = [];
const Player = require("./model/player");
const simplesQuestions = require('./data/simplesQuestions');
const copyQuestions = simplesQuestions.slice(0);
const DashboardService = require("./services/dashboard.service");
const dashboardService = new DashboardService();
const UserResponseInformations = require("./model/user-response-informations");

io.sockets.on('connection', function(socket) {
    //console.log('connected');
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
                console.log('add========================');
                join_rooms(socket, player.team);
                question_collectif_seq(socket);
                question_collectif_par(socket);
                sendToOne('Home', socket, 'navigate');

                //socket.emit("players-to-table", ["toto", "tutu"]);
                if (session.table !== null) {
                    sendToOne({ pseudo: player.pseudo, team: player.team }, session.table, 'listen-user-login');
                }

                //question_collectif_par(socket);
                //io.sockets.in(room.navigate).emit('navigate', 'QuestionCollectif');
                /*fs.readFile('./img_question.png', function(err, data) {
                    //console.log(data);
                    //socket.emit('imageConversionByClient', { image: true, buffer: data });
                    //socket.emit('img', "data:image/png;base64," + data.toString("base64"));
                    io.sockets.in(room.navigate).emit('question-collectif-img', "data:image/png;base64," + data.toString("base64"));
                });*/



                /************************
                 * PARTIE LUTTHY
                 ***********************/
                const indivQuestionChannel = "indivQuestion";

                socket.on(indivQuestionChannel, (msg) => {
                    if (msg.data === "ready") {
                        io.emit("waitingScreen", { isReady: true });
                    }
                });

                isEverybodyReady(socket);
                retrieveSimpleQuestionResponse(socket);
                retrieveDashboardDatas(socket);

                /************************
                 * FIN PARTIE LUTTHY
                 ***********************/


                //io.sockets.in(room.navigate).emit('ready', '');
                //sendToOne('', socket, 'ready', 1);
                /*console.log('connected');
                socket.join('navigate');
                socket.join('send-question-collectif');
                socket.join('send-question-collectif-v2');
                //socket.join('reset');
                socket.on('questionn', (message) => {
                    console.log('questionn recu');
                    fs.readFile('./img_question.png', function(err, data) {
                        console.log(data);
                        //socket.emit('imageConversionByClient', { image: true, buffer: data });
                        socket.emit('img', "data:image/png;base64," + data.toString("base64"));
                    });
                });
                socket.emit('navigate', 'Home');
                socket.join("simple-question");
                socket.on('ready-question-collectif-v2', (message) => {
                    socket.emit('ask-question-collectif-request-v2', questionv2.situation);
                    questionv2.ready += 1;
                });*/

            }


            /*---------------------------------------------------------------------------------*/
            /*---------------------------------------------------------------------------------*/
        } else { //cas ou c'est la table
            console.log('ici-table : ' + message.data);
            session.table = socket;
            socket.on('question-collectif-seq', message => {
                console.log('table:question-collectif-seq');
                sendToAll(room.navigate, 'QuestionCollectif', 'navigate');
                fs.readFile('./img_question.png', function(err, data) {
                    sendToAll(room.question_sequentiel, "data:image/png;base64," + data.toString("base64"), 'question-collectif-img');
                    //io.sockets.in(room.question_sequentiel).emit('question-collectif-img', "data:image/png;base64," + data.toString("base64"));
                });
                //sendToAll(room.navigate, 'QuestionCollectif', 'navigate');
            });
            socket.on('ready-screen-par', message => {
                console.log('table:ready-screen-par');
                sendToAll(room.ready, '', 'ready-screen-par');
            });
            // MOCK : listening for player request
            socket.on('addPlayerPlease', message => {
                console.log("player name requested : " + message.data);
                const player = new Player();
                player.pseudo = "titi";
                player.team = "blue";
                sendToOne(player, socket, 'returningPlayer', 0);
            });

            // MOCK : listening for scores request
            socket.on('sendScores', message => {
                console.log("scores requested : " + message.data);
                sendToOne(["titi", "toto", "tata"], socket, 'returningScores', 0);
            });

            socket.on("indivQuestion", (msg) => {
                console.log(msg.data);
                if (msg.data === "ready") {
                    setTimeout(() => {
                        sendToOne({ isReady: true },socket,"waitingScreen",0);
                    },3000);
                }
            });



            //socket.emit('start-question-collectif', '');
            /*socket.emit('questionn', '');
            socket.on('video-resume-question-collectif', (message) => {
                io.emit('navigate', 'QuestionCollectif');
                //socket.emit('img', "data:image/png;base64," + data.toString("base64"));

                //console.log('pause-resume');
                //socket.emit('navigate', 'QuestionCollectifV2');
                //session.nextSessionA().emit('question-collectif', question.firstQuestion());
            });*/
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

    socket.on('reset', (reason) => {
        console.log('reset');
        //questionv2.ready = 0;
        question.reset();
        session.reset();
    });

    /*socket.on('question-collectif-request', (reason) => {
        console.log(reason);
        socket.emit('navigate', 'QuestionCollectif');
    });

    socket.on('question-collectif-request-v2', (reason) => {
        console.log(reason);
        socket.emit('navigate', 'QuestionCollectifV2');
        //socket.emit('ask-question-collectif-request-v2', questionv2.situation);

    });
    socket.on('answers-question-collectif-request-v2', (message) => {
        socket.emit('answers-question-collectif-request-v2', questionv2.answers[questionv2.ready - 1]);

    });


    socket.on('ask-question-collectif-request-v2', (reason) => {
        console.log(questionv2.answers[0]);
        socket.emit('ask-question-collectif-request-v2', questionv2.situation);
        socket.emit('answers-question-collectif-request-v2', questionv2.answers[0]);
    });

    socket.on('question-collectif', (reason) => {
        let quest = question.answer(reason);
        if (quest !== null) {
            //session.nextSessionA().emit('question-collectif', quest);
        }
        //console.log("Reponse ", reason);
    });*/


    // indiv Question Communication




    /*socket.on('loginTable', (reason) => {
        console.log('la table est connecté');
        session.setTableSession(socket);
        session.getTableSession().emit('table', session.getTab());
    });

    socket.on('table', (reason) => {
        console.log('la table: ' + reason);
    });*/

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
            nQuestionCounter++;
            io.emit("ask-simple-question", {
                isEverybodyReady: true,
                question: getSimpleQuestion(),
                questionCounter: nQuestionCounter,
                maxTimer: 15
            });

            updateUser(uuid, true);
        }
    });
}

function getSimpleQuestion() {
    const question = copyQuestions[0];
    copyQuestions.splice(0, 1);

    console.log(question);

    return question;
}

function retrieveSimpleQuestionResponse(socket) {
    console.log("on ask simple question");
    socket.on("ask-simple-question", (response) => {
        console.log("question", response);
        const data = response.data;

        const userResponseTime = data.userResponseTime;

        const player = session.getPlayer(response.uuid);
        const playerResponse = new UserResponseInformations();
        playerResponse.playerUuid = response.uuid;
        playerResponse.questionId = data.questionId;
        playerResponse.responseId = data.userResponse;
        playerResponse.responseTime = userResponseTime;

        let isCorrectPlayerResponse = false;

        simplesQuestions.forEach((question) => {
            if (question.id === data.questionId) {
                playerResponse.category = question.category;
                question.responses.forEach((res) => {
                    if (res.id === data.userResponse && res.isValid) {
                        isCorrectPlayerResponse = true;
                        player.isReady = false;
                        player.score += 1;
                    }
                });
            }
        });

        playerResponse.isGoodResponse = isCorrectPlayerResponse;

        playersResponsesInformations.push(playerResponse);

        if (socket === player.session) {
            socket.emit("response-simple-question", {
                isCorrectPlayerResponse: isCorrectPlayerResponse
            });
        }


        socket.emit("indivQuestion", { msg: isCorrectPlayerResponse });
    });
}

function retrieveDashboardDatas(socket) {
    socket.on("dashboard-request", (response) => {
        if (response.data.request === true) {
            /*let dashboardDatas = dashboardService.retrieveRandomDashboardStatistics(
                response.uiid,
                session.getTeam(session.getPlayer(response.uuid).team).players.size
            );*/

            const dashboardDatas = dashboardService.retrieveDashboardStatistics(
                response.uuid,
                playersResponsesInformations,
                session.getTeam(session.getPlayer(response.uuid).team).players.size
            );

            console.log(dashboardDatas);
            socket.emit("dashboard-datas", dashboardDatas);
        }
    });
}

function updateUser(uuid, isReady) {
    session.getPlayer(uuid).isReady = isReady;
}


server.listen(process.env.PORT || 4000);