const utils = require("../utils");
const TeamInformations = require("../model/team-informations");
const simplesQuestions = require("../data/simplesQuestions");

class TeamInformationsService {

    constructor(playersNumber) {
        this.playersNumber = playersNumber;
    }

    createRandomInformations(nResponses = null) {
        const teamInfos = [];

        if (!nResponses) {
            // nResponses = utils.getRandom(15, 30);
            nResponses = simplesQuestions.length;
        }

        for (let i = 0; i < nResponses; i++) {
            const infos = new TeamInformations();
            infos.responseTime = utils.getRandom(30, 110) / 10;

            for (let j = 1; j <= this.playersNumber; j++) {
                const random = Math.random() >= 0.5;
                infos.responses[j] = random;
            }

            for (const player in infos.responses) {
                if (infos.responses.hasOwnProperty(player)) {
                    infos.responses[player] ? infos.nGoodResponses++ : infos.nBadResponses++;
                }
            }

            teamInfos.push(infos);
        }

        return teamInfos;
    }
}

module.exports = TeamInformationsService;