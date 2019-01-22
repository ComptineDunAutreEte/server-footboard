const Game = require("../model/game");

class GameFactory {
    create(level, teamInfos) {
        const game = new Game();

        game.level = level;
        game.teamInfos = teamInfos;

        return game;
    }
}

module.exports = GameFactory;