class QuestionCollectif {
    constructor(img, _questions, right_answers) {
        this.image = img;
        this.questions = _questions;
        this.teamA_answers = [];
        this.teamB_answers = [];
        this.team_A = [];
        this.team_B = [];
        this.nbr_A = 0;
        this.nbr_B = 0;
        this.right_answers = right_answers;
        this.map_session = new Map();
        this.init();
    }


    add_ID_A(_id, socket) {
        this.map_session.set(_id, socket);
        if (!this.team_A.includes(_id)) {
            this.team_A.push(_id);
        }
        return this.team_A.length === 3;
    }

    get_next_session_team_A() {
        let index = this.nbr_A % this.map_session.size;
        // console.log('nbr session: ' + index);
        //this.map_session.set(_id, socket)
        this.nbr_A++;
        let id = this.team_A[index];
        console.log(id);
        return this.map_session.get(id);
    }

    get_next_ID_from_team_B() {
        let index = this.nbr_B % this.team_B.length;
        this.nbr_B++;
        return this.team_A[index];
    }

    reset() {
        this.team_A = [];
        this.team_B = [];
        this.nbr_A = 0;
        this.nbbr_B = 0;
    }

    add_ID_B(ID) {
        if (this.team_B.includes(ÌD)) {
            this.team_B.push(ID);
        }
        return this.team_B.length === 3;
    }
    addQuestion(key, question) {

    }

    init() {
        this.reponses = new Map();
        for (let question of this.questions.values()) {
            for (let reponse of question.reponses) {
                this.reponses.set(reponse.id, reponse);
            }
        }
    }

    getAnswers() {
        return this.reponses;
    }
    answer(answer) { //object :team, pseudo, question, answer
        if (answer) {
            console.log("\n\n\n Répond: ", answer, "\n\n\n");
            if (answer.team === 'A') {
                this.teamA_answers.push(answer);
            } else if (answer.team === 'B') {
                this.teamB_answers.push(answer);
            }
        }
        //console.log('key: ', answer);
        return this.questions.get(answer.key);
    }

    getTeamAResult() {
        return this.teamA_answers;
    }

    getTeamBResult() {
        return this.teamB_answers;
    }

    firstQuestion() { //return next question
        return this.questions.get('start');
    }

    getAcceptableAnswer(team) {
        let first;
        let array = [];
        if (team === 'Team_A') {
            first = this.teamA_answers[0].answer;
        } else if (team === 'Team_B') {
            first = this.teamB_answers[0].answer;
        }
        console.log('first', first);
        for (; first;) {
            array.push(first);
            first = this.reponses.get(first.next);
        }
        return array;

    }

    getCorrectAnswer() {
        let correct_answers = [];
        for (let id in this.right_answers) {
            correct_answers.push(this.reponses.get(id));
        }
        return correct_answers = [];
    }

    computeResultTeamA() {
        let len = this.teamA_answers.length;
        let corrects = [];
        let acceptable = [];
        console.log("\n\n\n length ", this.teamA_answers.length);
        for (let i = 0; i < len; i++) {

            if (i === 0) {
                if (Object.is(this.teamA_answers[i].answer.id, this.right_answers[i])) {
                    console.log("\n\n\n 1");
                    corrects.push(this.right_answers[i]);
                } else {
                    console.log("\n\n\n 2");
                    acceptable.push(this.teamA_answers[i].answer);
                }
            } else {
                if (Object.is(this.teamA_answers[i].answer.id, this.right_answers[i])) {
                    corrects.push(this.right_answers[i]);
                    console.log("\n\n\n 3");
                } else if (acceptable.length > 0) {
                    if (Object.is(this.teamA_answers[i].answer.id, acceptable[i - 1].next))
                        acceptable.push(this.teamA_answers[i].answer);
                    console.log("\n\n\n 4");
                }
            }
        }
        console.log("\n\n\n corrects" + corrects);
        console.log("\n\n\n acceptable" + acceptable);
        if (corrects.length > 0) {
            return corrects.length * 5;
        } else if (acceptable.length === 3) {
            return acceptable.length;
        } else return 0;
    }
}
//
const start_question = {
    question: "Que pensez-vous de la position du joueur 9 ?",
    reponses: [{
            key: "second_question_a",
            reponse: "Il est bien placé",
            id: "1a",
            next: "ab"

        },
        {
            key: "second_question_b",
            reponse: "Il est mal placé",
            id: "1b",
            next: "bb"
        }
    ]
};
//
const second_question_a = {
    question: "D'après vous que vas-t-il se passer ?",
    reponses: [{
            key: "third_question_a1",
            reponse: "A va faire une passe au joueur B",
            id: "aa",
            next: "a1b"

        },
        {
            key: "third_question_b1",
            reponse: "A va faire une passe au joueur C",
            id: "ab",
            next: "b1b"
        },
        {
            key: "third_question_c1",
            reponse: "A va garder le ballon",
            id: "ac",
            next: "c1c"
        }
    ]
};
//
const third_question_a1 = {
    question: "Que celà signifie ?",
    reponses: [{
            key: null,
            reponse: "le joueur 9 perd le ballon",
            id: "a1a",
            next: null
        },
        {
            key: null,
            reponse: "le joueur 9 ouvre le jeu aux joueurs adverse",
            id: "a1b",
            next: null
        },
        {
            key: null,
            reponse: "Rien...",
            id: "a1c",
            next: null
        }
    ]
};
//
const third_question_b1 = {
    question: "D'après vous que vas-t-il se passer ?",
    reponses: [{
            key: null,
            reponse: "le joueur 9 perd le ballon",
            id: "b1a",
            next: null
        },
        {
            key: null,
            reponse: "le joueur A ouvre le terrain ",
            id: "b1b",
            next: null
        },
        {
            key: null,
            reponse: "Rien...",
            id: "b1c",
            next: null
        }
    ]
};
//
const third_question_c1 = {
    question: "D'après vous que va-t-il se passer ?",
    reponses: [{
            key: null,
            reponse: "Il va avancer tout seul",
            id: "c1a",
            next: null
        },
        {
            key: null,
            reponse: "Il va perdre le ballon",
            id: "c1b",
            next: null
        },
        {
            key: null,
            reponse: "Il va devoir faire une passe",
            id: "c1c",
            next: null
        }
    ]
};

//
const second_question_b = {
    question: "D'après vous, où devrait-t-il être?",
    reponses: [{
            key: "third_question_ba2",
            reponse: "Il devrait se placer près du goal",
            id: "ba",
            next: "ba1a"
        },
        {
            key: "third_question_bb1",
            reponse: "Il devrait se placer près du joueur A",
            id: "bb",
            next: "bb1a"
        }, {
            key: "third_question_bc2",
            reponse: "Il devrait se placer près du joueur B",
            id: "bc",
            next: "bc1a"
        }
    ]
};

//
const third_question_ba1 = {
    question: "Que pensez vous de cette position ?",
    reponses: [{
            key: null,
            reponse: "Aucun intérêt...",
            id: "ba1a",
            next: null
        },
        {
            key: null,
            reponse: "Plutôt bien...",
            id: "ba1b",
            next: null
        }
    ]
};

//
const third_question_bb1 = {
    question: "D'après vous que va-t-il se passer ?",
    reponses: [{
            key: null,
            reponse: "Le joueur A va devoir faire une passe au joueur C",
            id: "bb1a",
            next: null
        },
        {
            key: null,
            reponse: "Le joueur A ne fera rien",
            id: "bb1b",
            next: null
        }
    ]
};

//
const third_question_bc1 = {
    question: "Que pensez vous de cette position ?",
    reponses: [{
            key: null,
            reponse: "Aucun intérêt...",
            id: "bc1a",
            next: null
        },
        {
            key: null,
            reponse: "Plutôt bien...",
            id: "bc1b",
            next: null
        }
    ]
};

const tab = [start_question, second_question_a,
    third_question_a1, third_question_b1, third_question_c1,
    second_question_b, third_question_ba1,
    third_question_bb1, third_question_bc1, third_question_bc1
];

const map_of_questions = new Map();
map_of_questions.set("start", start_question);

map_of_questions.set("second_question_a", second_question_a);
map_of_questions.set("third_question_a1", third_question_a1);
map_of_questions.set("third_question_b1", third_question_b1);
map_of_questions.set("third_question_c1", third_question_c1);
map_of_questions.set("second_question_b", second_question_b);
map_of_questions.set("third_question_ba1", third_question_ba1);
map_of_questions.set("third_question_bb1", third_question_bb1);
map_of_questions.set("third_question_bc1", third_question_bc1);
map_of_questions.set("third_question_bc1", third_question_bc1);

const right_answers = ['1a', 'bb', 'bb1a'];
const question = new QuestionCollectif("", map_of_questions, right_answers);

const answer_template = {
    team: "Team_A",
    pseudo: "Blanche",
    answer: {
        key: 'second_question_a',
        reponse: 'Il est bien placé',
        id: '1a',
        next: 'ab'
    }
};

const answer_template_second = {
    team: "Team_A",
    pseudo: "Alex",
    answer: {
        key: 'third_question_bb1',
        reponse: 'Il devrait se placer près du joueur A',
        id: 'bb',
        next: 'bb1a'
    }
};

const answer_template_last = {
    team: "Team_A",
    pseudo: "Alex",
    answer: {
        key: null,
        reponse: 'Le joueur A va devoir faire une passe au joueur C',
        id: 'bb1a',
        next: null
    }
};



//console.log('ask for question', question.firstQuestion());
//console.log('ask for question', question.answer(answer_template));
//console.log('ask for question', question.answer(answer_template_second));
//console.log('ask for question', question.answer(answer_template_last));

//console.log('\n\n\nReponses:', question.getAnswers());

//console.log('\n\n\nResults A:', question.getAcceptableAnswer('Team_A'));
module.exports = question;