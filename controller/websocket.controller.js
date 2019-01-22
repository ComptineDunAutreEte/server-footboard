const channels = require("../model/channels");
const teamName = require("../data/team-name");
const levels = require("../model/levels");
const TeamFactory = require("../factory/team.factory");
const GameFactory = require("../factory/game.factory");
const UserService = require("../service/user.service");
const GameService = require("../service/game.service");
const QuestionFactory = require("./factory/question.factory");

// const questionsFactory = new QuestionFactory();

class WebSocketController {

    constructor() {
        this.gameService = new GameService();
        this.userService = new UserService();
    }

    onConnect(socket) {
        // Indique qu'un utilisateur est connecté
        console.log('a user connected');

        this.initGame(socket);
        this.login(socket);


        // Déconnexion
        this.disconnect(socket);
    }

    initGame(socket) {
        const gameFactory = new GameFactory();
        const teamFactory = new TeamFactory();

        const teamA = teamFactory.createTeam(teamName[0], 1);
        const teamB = teamFactory.createTeam(teamName[1], 1);
        const teamsInfos = [teamA, teamB];

        const game = gameFactory.create(levels.easy, teamsInfos); // @TODO CHANGER LEVEL A RECUPERER MANUELLEMENT
        this.gameService.setGame(game);

        socket.emit(channels.init, game);
    }

    login(socket) {
        socket.on(channels.login, (user) => {
            const game = this.gameService.getGame();
            let isUserAdded = false;

            game.teamInfos.forEach((team) => {
                if (team.name === user.team && team.users.length < team.playerNumber) {
                    team.users.push(user);
                    isUserAdded = true;
                }
            });

            socket.emit(channels.login, isUserAdded);
        });
    }

    disconnect(socket) {
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    }
}

module.exports = WebSocketController;