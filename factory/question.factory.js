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
                easyQuestions.forEach((q) => {
                    const question = new Question();
                    question.responses = q.responses;
                    question.id = q.id;
                    question.question = q.question;
                    question.illustration = q.illustration;
                    questions.push(question);
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