const UserResponseInformationsService = require("./user-response-informations.service");
const TeamInformationsService = require("./team-informations.service");

class DashboardService {

    constructor() {
        this.playersNumber = 0;
    }

    setPlayersNumber() {
        this.playersNumber += 1;
    }

    retrieveDashboardStatistics(uuid, playersResponsesInformations, teamPlayers) {

        const userResponsesService = new UserResponseInformationsService();
        const userResponses = [];
        const generalResponses = userResponsesService.createRandomResponses(playersResponsesInformations.length);

        const teamInformationsService = new TeamInformationsService(teamPlayers);

        const aResponses = teamInformationsService.createRandomInformations();
        const bResponses = teamInformationsService.createRandomInformations(aResponses.length);

        playersResponsesInformations.forEach((playerResponse) => {
            if (playerResponse.playerUuid === uuid) {
                userResponses.push(playerResponse);
            }
        });

        return {
            perso: {
                userResponses: userResponses,
                generalResponses: generalResponses
            },
            team: {
                aResponses: aResponses,
                bResponses: bResponses
            }
        };

    }

    retrieveRandomDashboardStatistics(uuid, teamPlayers) {
        const userResponsesService = new UserResponseInformationsService();
        const userResponses = userResponsesService.createRandomResponses();
        const generalResponses = userResponsesService.createRandomResponses(userResponses.length);

        const teamInformationsService = new TeamInformationsService(teamPlayers);

        const aResponses = teamInformationsService.createRandomInformations();
        const bResponses = teamInformationsService.createRandomInformations(aResponses.length);


        return {
            perso: {
                userResponses: userResponses,
                generalResponses: generalResponses
            },
            team: {
                aResponses: aResponses,
                bResponses: bResponses
            }
        };
    }
}

module.exports = DashboardService;
