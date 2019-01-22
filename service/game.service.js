class GameService {
    constructor() {
        this.game = null;
    }

    setGame(game) {
        this.game = game;
    }

    getGame() {
        return this.game;
    }
}

module.exports = GameService;