const GameService = require("../../../services/game.service");
const gameService = new GameService();

describe("GameService", () => {
    it("Devrait retourner un tableau de joueurs ordonné par ordre de temps", () => {
        const mockPlayersTime = [
            {
                uuid: "456",
                pseudo: "tutu",
                team: "red",
                responseTime: 4.3,
                isGoodResponse: true
            },
            {
                uuid: "123",
                pseudo: "toto",
                team: "red",
                responseTime: 3.2,
                isGoodResponse: true
            },
            {
                uuid: "789",
                pseudo: "titi",
                team: "blue",
                responseTime: 4.6,
                isGoodResponse: true
            },
        ];

        const playersOrder = gameService.retrievePlayerOrderWhichPlay(mockPlayersTime);

        expect(playersOrder).toEqual([
            {
                uuid: "123",
                pseudo: "toto",
                team: "red",
                responseTime: 3.2,
                isGoodResponse: true
            },
            {
                uuid: "456",
                pseudo: "tutu",
                team: "red",
                responseTime: 4.3,
                isGoodResponse: true
            },
            {
                uuid: "789",
                pseudo: "titi",
                team: "blue",
                responseTime: 4.6,
                isGoodResponse: true
            },
        ]);
    });

    it("Devrait supprimer les joueurs qui on trépondu faux et retourner un tableau de joueurs ordonné par ordre de temps", () => {
        const mockPlayersTime = [
            {
                uuid: "456",
                pseudo: "tutu",
                team: "red",
                responseTime: 4.3,
                isGoodResponse: false
            },
            {
                uuid: "123",
                pseudo: "toto",
                team: "red",
                responseTime: 3.2,
                isGoodResponse: true
            },
            {
                uuid: "789",
                pseudo: "titi",
                team: "blue",
                responseTime: 4.6,
                isGoodResponse: true
            },
        ];

        const playersOrder = gameService.retrievePlayerOrderWhichPlay(mockPlayersTime);

        expect(playersOrder).toEqual([
            {
                uuid: "123",
                pseudo: "toto",
                team: "red",
                responseTime: 3.2,
                isGoodResponse: true
            },
            {
                uuid: "789",
                pseudo: "titi",
                team: "blue",
                responseTime: 4.6,
                isGoodResponse: true
            },
        ]);
    });
});
