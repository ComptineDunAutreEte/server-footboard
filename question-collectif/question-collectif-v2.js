class QuestionCollectifV2 {
    constructor(situation, answers) {
        this.situation = situation;
        this.answers = answers;
        this.ready = [false, false];
        this.sessionA = [];
        this.sessionB = [];
        this.team_map = new Map();

        this.answer_A = [];
        this.answer_B = [];
    }
    addSession(socket, player) {
        this.team_map.set(player.uuid, player.team);
        if (player.team === 'A') {
            this.sessionA.push(socket);
        } else {
            this.sessionB.push(socket);
        }
    }

    answer(message, io, table) {
        let team = this.team_map.get(message.uuid);
        if (team === 'A') {
            this.answer_A.push(message.data);
        } else {
            this.answer_B.push(message.data);
        }

        if (this.answer_A.length === this.sessionA.length) {
            this.ready[0] = true;
            //all-answered
            io.to('team_A').emit('wait-for-others', 'Veuillez attendre l\'équipe Adverse');
        }
        if (this.answer_B.length === this.sessionB.length) {
            this.ready[1] = true;
            if (this.sessionB.length > 0) {
                //io.to('team_B').emit('all-answered', '');
                //send all-answer
                io.to('team_B').emit('wait-for-others', 'Veuillez attendre l\'équipe Adverse');
            }
        }

        if (this.ready[0] && this.ready[1]) {
            io.to('question-parrallel').emit('all-answered', '');
        }
    }

    send_answer() {
        for (let i = 0; i < this.sessionA.length; i++) {
            this.sessionA[i].emit('answers', this.answers[i]);
        }
    }

    reset() {
        this.sessionA = [];
        this.sessionB = [];
        this.ready = [false, false];
    }
}


const answers = [{
        "question": "Vous êtes le joueur J1, Que devrez vous faire pour que votre équipe garde le ballon?",
        "reponses": [{
                "reponse": "j'avance vers la zone A",
                "moveTo": [{
                    "zone": "A",
                    "color": "#03a9f4",
                    "x": 478,
                    "y": 445,
                    "size": 100,
                    "uuid": "f7b1163c-b43d-4b42-a543-b2011d5de099",
                    "type": "Player"
                }]
            },
            {
                "reponse": "j'avance vers la zone B",
                "moveTo": [{
                    "zone": "B",
                    "color": "#03a9f4",
                    "x": 597.5,
                    "y": 7.5,
                    "size": 100,
                    "uuid": "f7b1163c-b43d-4b42-a543-b2011d5de099",
                    "type": "Player"
                }]
            },
            {
                "reponse": "je reste la",
                "moveTo": null
            }
        ]
    },
    {
        "question": "Vous êtes le joueur J2, Que devrez vous faire pour que votre équipe garde le ballon?",
        "reponses": [{
                "reponse": "j'avance avec le Ballon vers la zone A",
                "moveTo": [{
                        "zone": "A",
                        "color": "#03a9f4",
                        "x": 273.5,
                        "y": 228.5,
                        "size": 100,
                        "uuid": "bbff2ade-9c4f-4a96-9248-3be2596a120e",
                        "type": "Player"
                    },
                    {
                        "color": "white",
                        "x": 381.5,
                        "y": 251,
                        "size": 50,
                        "uuid": "c6e1d14b-f896-4790-8489-319d5600d79b",
                        "type": "Ball"
                    }
                ]
            },
            {
                "reponse": "je tire vers la zone B",
                "moveTo": [{
                    "zone": "B",
                    "color": "white",
                    "x": 447.5,
                    "y": 182,
                    "size": 50,
                    "uuid": "c6e1d14b-f896-4790-8489-319d5600d79b",
                    "type": "Ball"
                }]
            },
            {
                "reponse": "je tire vers la zone C",
                "moveTo": [{
                    "zone": "C",
                    "color": "white",
                    "x": 676.5,
                    "y": 280.5,
                    "size": 50,
                    "uuid": "c6e1d14b-f896-4790-8489-319d5600d79b",
                    "type": "Ball"
                }]
            }
        ]
    },
    {
        "question": "Vous êtes le joueur J2, Que devrez vous faire pour que votre équipe garde le ballon?",
        "reponses": [{
                "reponse": "J'avance vers la zone A",
                "moveTo": [{
                    "zone": "A",
                    "color": "#03a9f4",
                    "x": 438.5,
                    "y": 226.5,
                    "size": 100,
                    "uuid": "83893857-3f2e-4828-8fbb-775671aba40f",
                    "type": "Player"
                }]
            },
            {
                "reponse": "J'avance vers la zone B",
                "moveTo": [{
                    "zone": "B",
                    "color": "#03a9f4",
                    "x": 685.5,
                    "y": 584,
                    "size": 100,
                    "uuid": "83893857-3f2e-4828-8fbb-775671aba40f",
                    "type": "Player"
                }]
            },
            {
                "reponse": "Je reste la",
                "moveTo": null
            }
        ]
    }
];

const situation = [{
        "color": "#03a9f4",
        "x": 11.5,
        "y": 215.5,
        "size": 100,
        "uuid": "bbff2ade-9c4f-4a96-9248-3be2596a120e",
        "type": "Player",
        "name": "J2"
    },
    {
        "color": "#03a9f4",
        "x": 316.5,
        "y": 77,
        "size": 100,
        "uuid": "f7b1163c-b43d-4b42-a543-b2011d5de099",
        "type": "Player",
        "name": "J1"
    },
    {
        "color": "#03a9f4",
        "x": 501,
        "y": 131,
        "size": 100,
        "uuid": "a6833ff1-41e1-4b42-8bfa-86baee345c98",
        "type": "Player",
        "name": ""
    },
    {
        "color": "#03a9f4",
        "x": 695,
        "y": 199,
        "size": 100,
        "uuid": "83893857-3f2e-4828-8fbb-775671aba40f",
        "type": "Player",
        "name": "J3"
    },
    {
        "color": "#ff5722",
        "x": 41.5,
        "y": 332,
        "size": 100,
        "uuid": "278bd549-7739-4776-b617-5302b55c3779",
        "type": "Player",
        "name": ""
    },
    {
        "color": "#ff5722",
        "x": 87.5,
        "y": 114.5,
        "size": 100,
        "uuid": "8444a6a0-faa5-4817-a735-22b9294f850b",
        "type": "Player",
        "name": ""
    },
    {
        "color": "#ff5722",
        "x": 382,
        "y": -8,
        "size": 100,
        "uuid": "7fc726b9-67dc-49df-8969-456670f39912",
        "type": "Player",
        "name": ""
    },
    {
        "color": "#ff5722",
        "x": 487,
        "y": 287,
        "size": 100,
        "uuid": "c211b7d7-55e6-4c19-ac53-4a21f1ba02f6",
        "type": "Player",
        "name": ""
    },
    {
        "color": "#ff5722",
        "x": 693,
        "y": 86,
        "size": 100,
        "uuid": "de90fe1c-f68a-40d7-8dd9-f58786ef17e3",
        "type": "Player",
        "name": ""
    },
    {
        "color": "white",
        "x": 119.5,
        "y": 246.5,
        "size": 50,
        "uuid": "c6e1d14b-f896-4790-8489-319d5600d79b",
        "type": "Ball",
        "name": ""
    }
];


const situation2 = [{
        "color": "#03a9f4",
        "x": 524,
        "y": 6,
        "size": 100,
        "uuid": "7b816e31-785f-4579-a888-8185dfbb53ba",
        "type": "Player",
        "name": "J2"

    },
    {
        "color": "#03a9f4",
        "x": 648,
        "y": 336,
        "size": 100,
        "uuid": "4f8a2190-a4cb-42cb-a0bd-1813eb085c3a",
        "type": "Player",
        "name": "J3"
    },
    {
        "color": "#03a9f4",
        "x": 150.5,
        "y": 316.5,
        "size": 100,
        "uuid": "cc798be9-f48c-483f-844a-3c17ee0b3652",
        "type": "Player",
        "name": "J1"
    },
    {
        "color": "#ff5722",
        "x": 414.5,
        "y": 142.5,
        "size": 100,
        "uuid": "579d61a4-aacc-4f49-b48b-ea5f2d969006",
        "type": "Player",
        "name": ""
    },
    {
        "color": "#ff5722",
        "x": 346.5,
        "y": 246,
        "size": 100,
        "uuid": "654293de-41ad-46d8-a1e4-3dffe6fbccc8",
        "type": "Player",
        "name": ""
    },
    {
        "color": "#ff5722",
        "x": 276.5,
        "y": 357,
        "size": 100,
        "uuid": "53aa2482-c899-4af7-88b1-bf02b7b48e2e",
        "type": "Player",
        "name": ""
    },
    {
        "color": "#ff5722",
        "x": 200.5,
        "y": 457,
        "size": 100,
        "uuid": "a6eb2771-88c7-4ecf-8a20-5c2d39ee8863",
        "type": "Player",
        "name": ""
    },
    {
        "color": "white",
        "x": 514.5,
        "y": 102.5,
        "size": 50,
        "uuid": "b1ae0d2d-e052-43fa-b51b-58968ff23346",
        "type": "Ball",
        "name": ""
    }
];

const answers2 = [{
        "question": "Vous êtes le joueur J1, que devriez-vous faire pour que votre équipe marque un but?",
        "reponses": [{
                "reponse": "Je ne bouge pas",
                "moveTo": null
            },
            {
                "reponse": "j'avance vers la zone A",
                "moveTo": [{
                    "color": "#03a9f4",
                    "zone": "A",
                    "x": 39,
                    "y": 73.5,
                    "size": 100,
                    "uuid": "cc798be9-f48c-483f-844a-3c17ee0b3652",
                    "type": "Player"
                }]
            }
        ]
    },
    {
        "question": "Vous êtes le joueur J2, que devriez-vous faire pour que votre équipe marque un but?",
        "reponses": [{
                "reponse": "Je passe le ballon au joueur 3 ",
                "moveTo": [{
                    "color": "white",
                    "zone": "",
                    "x": 596.5,
                    "y": 344,
                    "size": 50,
                    "uuid": "b1ae0d2d-e052-43fa-b51b-58968ff23346",
                    "type": "Ball"
                }]
            },
            {
                "reponse": "Je tire vers la zone B",
                "moveTo": [{
                    "color": "white",
                    "zone": "B",
                    "x": 136,
                    "y": 134,
                    "size": 50,
                    "uuid": "b1ae0d2d-e052-43fa-b51b-58968ff23346",
                    "type": "Ball"
                }]
            }
        ]
    },
    {
        "question": "Vous êtes le joueur J3, que devriez-vous faire pour que votre équipe marque un but?",
        "reponses": [{
                "reponse": "Je ne bouge pas",
                "moveTo": null
            },
            {
                "reponse": "j'avance vers la zone C",
                "moveTo": [{
                    "color": "#03a9f4",
                    "zone": "C",
                    "x": 98.5,
                    "y": 566.5,
                    "size": 100,
                    "uuid": "4f8a2190-a4cb-42cb-a0bd-1813eb085c3a",
                    "type": "Player"
                }]
            }
        ]
    }
];
const questionv2 = new QuestionCollectifV2(situation2, answers2);
module.exports = questionv2;