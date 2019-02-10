const UserResponseInformationsService = require("./user-response-informations.service");
const TeamInformationsService = require("./team-informations.service");

class DashboardService {

    constructor() {
        this.playersNumber = 0;
    }

    setPlayersNumber() {
        this.playersNumber += 1;
    }

    retrieveDashboardStatistics(uuid, teamPlayers) {

        console.log("teamPlayers", teamPlayers);

        const userResponsesService = new UserResponseInformationsService();
        const userResponses = userResponsesService.createResponses();
        const generalResponses = userResponsesService.createResponses(userResponses.length);

        const teamInformationsService = new TeamInformationsService(teamPlayers);

        const aResponses = teamInformationsService.createInformations();
        const bResponses = teamInformationsService.createInformations(aResponses.length);


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
