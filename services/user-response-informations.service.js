const UserResponseInformations = require("../model/user-response-informations");
const categories = require("../model/categories");
const utils = require("../utils");
const simplesQuestions = require("../data/simplesQuestions");

class UserResponseInformationsService {

    retrieveRealResponses() {

    }

    createRandomResponses(nResponses = null) {
        if (!nResponses) {
            //nResponses = utils.getRandom(15, 30);
            nResponses = simplesQuestions.length;
        }

        let userResponses = [];

        for (let i = 0; i < nResponses; i++) {
            const response = new UserResponseInformations();
            const keys = Object.keys(categories);
            const question = simplesQuestions.find((q) => q.id === i);
            const mockResponseTriche = utils.getRandom(1, 3);
            const goodResponse = question.responses.find((r) => r.isValid);
            const responseId = mockResponseTriche === 1 ? goodResponse.id : utils.getRandom(1, 4);

            response.questionId = i;
            response.responseId = responseId;
            response.category = categories[keys[utils.getRandom(0, keys.length)]];
            response.isGoodResponse = goodResponse.id === responseId;
            response.responseTime = utils.getRandom(30, 150) / 10;

            userResponses.push(response);
        }

        return userResponses;
    }
}

module.exports = UserResponseInformationsService;