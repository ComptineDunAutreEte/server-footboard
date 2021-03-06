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

var number = 0;
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
    team_B: "team_B",
    result: "result"
};

function join_rooms(socket, team) {
    socket.join(room.navigate);
    socket.join(room.question_parrallel);
    socket.join(room.question_sequentiel);
    socket.join(room.ready);
    socket.join(room.qst_screen);
    socket.join(room.result);
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
        socket.emit('answers-question-collectif-request-v2', questionv2.answers[number]);

        //for(session )
        //stocker l'ID
    });
    number++;
    socket.on('answered', message => {
        console.log(message);

        let newAnswer = questionv2.answer(message, io, session.table);

        let more = questionv2.more_answers[newAnswer.nextMove];

        if (message.team === 'B') {
            sendToAll(room.team_B, newAnswer, 'moveTo');
            if (more !== undefined) {
                if (more.toSession === -1) {
                    questionv2.ready[1] = true;
                    for (let p of questionv2.results) {
                        if (p.team === 'B') {
                            p.score = 0;
                        }
                    }
                    sendToAll(room.team_B, 'Mince, votre équipe à perdu le ballon...', 'lost');
                } else {
                    sendToOne(more.new_answer, questionv2.sessionB[more.toSession], 'moreAnswer');
                }
            }
        } else {
            sendToAll(room.team_A, newAnswer, 'moveTo');
            if (more !== undefined) {
                if (more.toSession === -1) {
                    questionv2.ready[0] = true;
                    for (let p of questionv2.results) {
                        if (p.team === 'A') {
                            p.score = 0;
                        }
                    }
                    sendToAll(room.team_A, 'Mince, votre équipe à perdu le ballon...', 'lost');
                } else {
                    sendToOne(more.new_answer, questionv2.sessionA[more.toSession], 'moreAnswer');
                }
            }
        }




        if (questionv2.answer_A.length === questionv2.sessionA.length) {
            console.log('team A all answer');
            questionv2.ready[0] = true;
            //all-answered
            sendToAll(room.team_A, 'Veuillez attendre l\'équipe Adverse', 'wait-for-others');
            //io.to('team_A').emit('wait-for-others', 'Veuillez attendre l\'équipe Adverse');
        }
        if (questionv2.answer_B.length === questionv2.sessionB.length) {
            console.log('team B all answer');
            questionv2.ready[1] = true;
            if (questionv2.sessionB.length > 0) {
                //io.to('team_B').emit('all-answered', '');
                //send all-answer
                //io.to('team_B').emit('wait-for-others', 'Veuillez attendre l\'équipe Adverse');
                sendToAll(room.team_B, 'Veuillez attendre l\'équipe Adverse', 'wait-for-others');
            }
        }

        if (questionv2.ready[0] && questionv2.ready[1]) {
            console.log('===all answer everyone===');
            ///io.to('question-parrallel').emit('all-answered', '');
            sendToAll(room.question_parrallel, '', 'all-answered');
        }

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
const GameService = require("./services/game.service");
const gameService = new GameService();
let playersTime = [];
let playersNumber = 0;
let sequence = [
    "parallel",
    "standard",
    "standard",
    "standard",
    "standard",
    "standard",
    "standard",
    "standard",
    "standard",
    "standard",
    "standard"
];

io.sockets.on('connection', function(socket) {
    socket.on('login', (message) => {
        if (message.type === 'tablet') {
            const data = message.data;

            const player = new Player();
            player.pseudo = data.pseudo;
            player.uuid = message.uuid;
            if (data.team === 'team_A');

            player.team = data.team;
            console.log(data.team);
            player.level = data.userLevel;

            if (session.add(player, socket)) {
                playersNumber += 1;
                console.log('add========================');
                join_rooms(socket, player.team);
                question_collectif_seq(socket);
                question_collectif_par(socket);
                sendToOne('Home', socket, 'navigate');
                questionv2.addSession(socket, player);
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
            socket.join(room.question_parrallel);
            socket.join(room.result);

            sendToOne({
                team: gameService.determineWhichTeamPlayInFirst(["red", "blue"])
            }, socket, "startTeam", 0);


            //===================QUESTION SEQ===================
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

            socket.on('terminer_jeux', message => {
                console.log('terminer');
                sendToAll(room.question_parrallel, '', 'terminer');
            });

            socket.on('terminer', message => {
                console.log('terminer');
                sendToAll(room.question_parrallel, questionv2.final_result, 'terminer');
            });

            socket.on('ask-result', message => {
                console.log('ask-result');
                let map_ = {};
                for (let p of questionv2.results) {
                    //map_.set(p.uuid, p.score);
                    let point = questionv2.points.get(p.uuid);
                    if (point) {
                        map_[p.uuid] = point;
                    } else {
                        map_[p.uuid] = p.score;
                    }
                }
                map_.good_answers = questionv2.good_answers;
                console.log(map_);
                sendToAll(room.result, map_, 'result');
            });

            //===================QUESTION PAR=====================

            socket.on('question-collectif-par', message => {
                console.log('table:question-collectif-par');
                sendToAll(room.navigate, 'QuestionCollectifV2', 'navigate');
                sendToAll(room.question_parrallel, questionv2.situation, 'situation');
                questionv2.send_answer();
                //send answer lot of thing to do
                //sendToAll(room.navigate, 'QuestionCollectif', 'navigate');
            });
            socket.on('ready-question', message => {
                console.log('table:ready-screen');
                sendToAll(room.ready, '', 'ready');
            });

            //======================================================


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

        const requestQuestionChannel = "request-question";

        socket.on(requestQuestionChannel, (msg) => {
            if (msg.data === "endOfSequence") {
                if (sequence.length > 0) {
                    const seq = sequence[0];
                    if (seq === "parallel") {
                        // Ta logique Long
                        console.log('table:question-collectif-par');
                        sendToAll(room.navigate, 'QuestionCollectifV2', 'navigate');
                        sendToAll(room.question_parrallel, questionv2.situation, 'situation');
                        sendToOne('', session.table, 'start-question');
                        questionv2.send_answer();
                        sequence.shift();
                    } else {
                        io.emit("waitingScreen", { isReady: true });
                        socket.emit("start-of-new-question", {
                            data: 1
                        });
                        sequence.shift();
                    }
                }
            }
        });


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
        questionv2.reset();
        session.reset();
        sequence = [
            "parallel",
            "standard",
            "standard",
            "standard",
            "standard",
            "standard",
            "standard",
            "standard",
            "standard",
            "standard",
            "standard"
        ];
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
            const userResponses = dashboardService.retrieveUserResponses(playersResponsesInformations, uuid);
            const history = dashboardService.retrieveHistory(userResponses);

            io.emit("ask-simple-question", {
                isEverybodyReady: true,
                question: getSimpleQuestion(),
                questionCounter: nQuestionCounter,
                maxTimer: 15,
                history: history
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

        playersTime.push({
            uuid: player.uuid,
            pseudo: player.pseudo,
            team: player.team,
            responseTime: userResponseTime,
            isGoodResponse: isCorrectPlayerResponse
        });

        playersResponsesInformations.push(playerResponse);

        if (playersNumber > 0 && playersTime.length === playersNumber) {
            if (session.table) {
                const datas = gameService.retrievePlayerOrderWhichPlay(playersTime);

                session.table.emit("indivQuestionResponse", {
                    data: datas
                });

                session.table.on("indivQuestionTest", (response) => {
                    if (response.data === true) {
                        playersTime.splice(0, playersTime.length);
                        playersTime = [];
                        console.log("playersTime after", playersTime);
                    }
                });
            }
        }

        if (socket === player.session) {
            socket.emit("response-simple-question", {
                isCorrectPlayerResponse: isCorrectPlayerResponse
            });
        }
    });
}

function retrieveDashboardDatas(socket) {
    socket.on("dashboard-request", (response) => {
        if (response.data.request === true) {
            // Random datas
            /*let dashboardDatas = dashboardService.retrieveRandomDashboardStatistics(
                response.uiid,
                session.getTeam(session.getPlayer(response.uuid).team).players.size
            );*/

            // Correct datas
            const dashboardDatas = dashboardService.retrieveDashboardStatistics(
                response.uuid,
                playersResponsesInformations,
                session.getTeam(session.getPlayer(response.uuid).team).players.size
            );

            socket.emit("dashboard-datas", dashboardDatas);
        }
    });
}

function updateUser(uuid, isReady) {
    session.getPlayer(uuid).isReady = isReady;
}


server.listen(process.env.PORT || 4000);