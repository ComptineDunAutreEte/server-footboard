const channels = require("../model/channels");
const teamName = require("../data/team-name");
const levels = require("../model/levels");
const TeamFactory = require("../factory/team.factory");
const GameFactory = require("../factory/game.factory");
const UserService = require("../service/user.service");
const GameService = require("../service/game.service");
const QuestionsService = require("../service/questions.service");
const QuestionFactory = require("../factory/question.factory");

class WebSocketController {

    constructor() {
        this.gameService = new GameService();
        this.userService = new UserService();
        this.questionsService = new QuestionsService();
    }

    onConnect(socket) {
        this.initGame(socket);
        this.login(socket);
        this.confirmReady(socket);

        // Déconnexion
        this.disconnect(socket);
    }

    /**
     * Initialise la partie
     * @param socket
     */
    initGame(socket) {
        const gameFactory = new GameFactory();
        const teamFactory = new TeamFactory();
        const questionFactory = new QuestionFactory();

        // @TODO Récupérer le nombre de joueurs


        const teamA = teamFactory.createTeam(teamName[0], 1);
        const teamB = teamFactory.createTeam(teamName[1], 1);
        const teamsInfos = [teamA, teamB];

        const game = gameFactory.create(levels.easy, teamsInfos); // @TODO CHANGER LEVEL A RECUPERER MANUELLEMENT
        this.gameService.setGame(game);
        this.questionsService.setQuestions(questionFactory.createQuestions(game.level));

        socket.emit(channels.init, game);
    }

    /**
     * Connecte un joueur au jeu et l'affecte à sa team
     * @param socket
     */
    login(socket) {
        // @TODO Contrôler qu'un pseudo est unique
        socket.on(channels.login, (user) => {
            const game = this.gameService.getGame();
            let isUserAdded = false;

            game.teams.forEach((team) => {
                if (team.name === user.team && team.users.length < team.playerNumber) {
                    team.users.push(user);
                    isUserAdded = true;
                }
                // @TODO Implement if not connected
            });

            this.gameService.setGame(game);

            socket.emit(channels.login, isUserAdded);
        });
    }

    /**
     * Confirme qu'un utilisateur est prêt à jouer
     * @param socket
     */
    confirmReady(socket) {
        socket.on(channels.ready, (user) => {
            const game = this.gameService.getGame();

            const isUserUpdated = this.userService.updateUser(game, user);

            this.gameService.setGame(game);

            // TODO REFACTO
            if (isUserUpdated) {
                let isEverybodyReady = true;
                game.teams.forEach((team) => {
                    team.users.forEach((user) => {
                        if (!user.isReady) {
                            isEverybodyReady = false;
                        }
                    });
                });

                if (isEverybodyReady) {
                    console.log("everybody is ready");
                    socket.emit(channels.ready, true);
                    this.sendQuestion(socket);
                } else {
                    socket.emit(channels.ready, false);
                }
            }
        });
    }

    sendQuestion(socket) {
        console.log("questions");
        socket.on(channels.question, () => {
            console.log("socket questions");
            let questions = this.questionsService.getQuestions();
            console.log("questions", questions);
            const indexQuestion = this.getRandomInt(0, questions.length - 1);
            const question = questions[indexQuestion];
            console.log("single question", question);
            questions.splice(indexQuestion, 1); // Supperssion de la question dans le tableau
            socket.emit(channels.question, question);
        });
    }


    // TODO : Sortir dans un service
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    disconnect(socket) {
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    }
}

module.exports = WebSocketController;