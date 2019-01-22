const levels = require("../model/levels");
const easyQuestions = require("../data/questions/easy");
const mediumQuestions = require("../data/questions/medium");
const hardQuestions = require("../data/questions/hard");
const Question = require("../model/question");

class SimpleQuestionFactory {
    createQuestions(level) {
        let questions = [];
        switch(level) {
            case levels.easy:
                console.log("easy");
                easyQuestions.forEach((o) => {
                    const question = new Question();
                    console.log(question);
                });
                break;
            case levels.medium:
                console.log("medium");
                console.log(mediumQuestions);
                break;
            case levels.hard:
                console.log("hard");
                console.log(hardQuestions);
                break;
            default:
                return;
        }

        return questions;
    }

    retrieveQuestion() {

    }
}

module.exports = SimpleQuestionFactory;