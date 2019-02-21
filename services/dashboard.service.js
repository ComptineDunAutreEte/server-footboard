const UserResponseInformationsService = require("./user-response-informations.service");
const TeamInformationsService = require("./team-informations.service");
const questions = require("../data/simplesQuestions");

class DashboardService {

    constructor() {
        this.playersNumber = 0;
    }

    setPlayersNumber() {
        this.playersNumber += 1;
    }

    retrieveDashboardStatistics(uuid, playersResponsesInformations, teamPlayers) {
        const userResponsesService = new UserResponseInformationsService();
        const userResponses = this.retrieveUserResponses(playersResponsesInformations, uuid);
        const generalResponses = userResponsesService.createRandomResponses(userResponses.length);

        const teamInformationsService = new TeamInformationsService(teamPlayers);

        const aResponses = teamInformationsService.createRandomInformations();
        const bResponses = teamInformationsService.createRandomInformations(aResponses.length);

        const history = this.retrieveHistory(userResponses);

        return {
            history: history,
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

    retrieveUserResponses(playersResponsesInformations, uuid) {
        return playersResponsesInformations.filter((p) => p.playerUuid === uuid);
    }

    retrieveHistory(userResponses) {
        const history = [];

        userResponses.forEach((userResponse, i) => {
            const question = questions.find((q) => q.id === userResponse.questionId);

            history.unshift({
                id: question.id,
                questionNumber: i + 1,
                question: question.question,
                responses: question.responses,
                category: question.category,
                anecdote: question.anecdote,
                userResponseId: userResponse.responseId,
                userResponseTime: userResponse.responseTime,
                isGoodResponse: userResponse.isGoodResponse
            });
        });
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
