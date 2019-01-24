const Game = require("../model/game");

class GameFactory {
    create(level, teams) {
        const game = new Game();

        game.level = level;
        game.teams = teams;

        return game;
    }
}

module.exports = GameFactory;