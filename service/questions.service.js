class QuestionsService {
    constructor() {
        this.questions = null;
    }

    setQuestions(questions) {
        this.questions = questions;
    }

    getQuestions() {
        return this.questions;
    }
}

module.exports = QuestionsService;