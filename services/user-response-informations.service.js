const UserResponseInformations = require("../model/user-response-informations");
const categories = require("../model/categories");
const utils = require("../utils");
const simplesQuestions = require("../data/simplesQuestions");

class UserResponseInformationsService {

    retrieveRealResponses() {

    }

    createRandomResponses(nResponses = null) {
        if (!nResponses) {
            nResponses = utils.getRandom(15, 30);
        }

        let userResponses = [];

        for (let i = 0; i < nResponses; i++) {
            const response = new UserResponseInformations();
            const keys = Object.keys(categories);
            response.category = categories[keys[utils.getRandom(0, keys.length)]];
            response.isGoodResponse = Math.random() >= 0.5;
            response.responseTime = utils.getRandom(30, 150) / 10;

            userResponses.push(response);
        }

        return userResponses;
    }
}

module.exports = UserResponseInformationsService;