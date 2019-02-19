class QuestionCollectifV2 {
    constructor(situation, answers) {
        this.situation = situation.situation;

        this.team_A = situation.team_A;
        this.team_B = situation.team_B;

        this.answers = answers;
        this.ready = [false, false];
        this.sessionA = [];
        this.sessionB = [];

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

    getBall(team) {
        for (let obj of team.tab) {
            if (obj.type === 'Ball') {
                return obj;
            }
        }
        return null;
    }

    getPlayer(team, player) {
        for (let obj of team.tab) {
            if (obj.uuid === player) {
                return obj;
            }
        }
        return null;
    }
    handle(team, answer) {
        if (answer.moveTo !== null) {
            if (answer.type === 'Player') {
                if (team.playerHasBall === answer.moveTo[0].uuid) {
                    let ball = this.getBall(team);
                    //+10,5 +40,5
                    if (ball) {
                        let x = answer.moveTo[0].x + 10.5;
                        let y = answer.moveTo[0].y + 40.5;

                        ball.x = x;
                        ball.y = y;
                        answer.moveTo.push(ball);
                    }
                }
            } else {
                if (answer.moveTo[0].toPlayer !== null) {
                    let player = this.getPlayer(team, answer.moveTo[0].toPlayer);
                    if (player) {
                        answer.moveTo[0].x = player.x + 10.5;
                        answer.moveTo[0].y = player.y + 40.5;
                    }
                }
                team.playerHasBall = answer.moveTo[0].toPlayer;
            }
        }
        return answer;

    }

    answer(message, io, table) {
        //let team = this.team_map.get(message.uuid);
        //for()
        let newMessage = null;
        if (message.team === 'A') {
            this.answer_A.push(message.data);
            newMessage = this.handle(this.team_A, message.data);
        } else {
            this.answer_B.push(message.data);
            newMessage = this.handle(this.team_B, message.data);
        }
        return newMessage;
    }

    send_answer() {
        for (let i = 0; i < this.sessionA.length; i++) {
            this.sessionA[i].emit('answers', this.answers[i]);
        }
        for (let i = 0; i < this.sessionB.length; i++) {
            console.log('B_answer');
            this.sessionB[i].emit('answers', this.answers[i]);
        }
    }

    reset() {
        this.sessionA = [];
        this.sessionB = [];
        this.ready = [false, false];


        this.situation = situation3.situation;

        this.team_A = situation3.team_A;
        this.team_B = situation3.team_B;

        this.answers = answers3;
    }
}





const answers3 = [{
        "question": "Vous incarnez Neymar que faîtes vous?",
        "reponses": [{
                "type": "Player",
                "reponse": "Je ne bouge pas",
                "moveTo": null
            },
            {
                "type": "Player",
                "reponse": "j'avance vers la zone A",
                "moveTo": [{
                    "zone": "A",
                    "color": "#03a9f4",
                    "x": 545.5,
                    "y": 408,
                    "size": 100,
                    "uuid": "19e1daf2-645b-446f-9988-a333d918da0e",
                    "type": "Player",
                    "name": "Neymar",
                    "image": "PBlanc",
                    "style": {
                        "width": 100,
                        "height": 100
                    }
                }]
            }
        ]
    },
    {
        "question": "Vous incarnez MBappe que faîtes vous?",
        "reponses": [{
                "type": "Ball",
                "reponse": "Je passe le ballon à Canavi",
                "moveTo": [{
                    "color": "#03a9f4",
                    "x": 200,
                    "y": 359.5,
                    "size": 30,
                    "uuid": "a8e58472-9cb4-40f0-8409-5c6c9060f118",
                    "type": "Ball",
                    "name": "",
                    "image": "Ball",
                    "style": {
                        "width": 30,
                        "height": 30
                    },
                    "toPlayer": "1367d74b-eaa4-4416-987c-1e55804e2570"
                }]
            },
            {
                "type": "Ball",
                "reponse": "Je passe le ballon à Neymar",
                "moveTo": [{
                    "color": "#03a9f4",
                    "x": 610.5,
                    "y": 316.5,
                    "size": 30,
                    "uuid": "a8e58472-9cb4-40f0-8409-5c6c9060f118",
                    "type": "Ball",
                    "name": "",
                    "image": "Ball",
                    "style": {
                        "width": 30,
                        "height": 30
                    },
                    "toPlayer": "19e1daf2-645b-446f-9988-a333d918da0e"
                }]
            }
        ]
    },
    {
        "question": "Vous incarnez Canavi que fâites vous?",
        "reponses": [{
                "type": "Player",
                "reponse": "Je ne bouge pas",
                "moveTo": null
            },
            {
                "type": "Player",
                "reponse": "j'avance vers la zone C",
                "moveTo": [{
                    "zone": "C",
                    "color": "#03a9f4",
                    "x": 151,
                    "y": 328.5,
                    "size": 100,
                    "uuid": "1367d74b-eaa4-4416-987c-1e55804e2570",
                    "type": "Player",
                    "name": "Cavani",
                    "image": "PBlanc",
                    "style": {
                        "width": 100,
                        "height": 100
                    }
                }]
            }
        ]
    }
];

const situation3 = {
    "team_B": {
        "playerHasBall": "05cdb75b-a987-4b6c-8007-5495409e76fb",
        "tab": [{
                "color": "#03a9f4",
                "x": 591,
                "y": 188,
                "size": 100,
                "uuid": "a8e58472-9cb4-40f0-8409-5c6c9060f118",
                "type": "Ball",
                "name": "",
                "image": "Ball",
                "style": {
                    "width": 30,
                    "height": 30
                }
            },
            {
                "color": "#03a9f4",
                "x": 400.5,
                "y": 289.5,
                "size": 100,
                "uuid": "1367d74b-eaa4-4416-987c-1e55804e2570",
                "type": "Player",
                "name": "Cavani",
                "image": "PBlanc",
                "style": {
                    "width": 100,
                    "height": 100
                }
            },
            {
                "color": "#03a9f4",
                "x": 620.5,
                "y": 154,
                "size": 100,
                "uuid": "05cdb75b-a987-4b6c-8007-5495409e76fb",
                "type": "Player",
                "name": "Mbappe",
                "image": "PBleuFoot",
                "style": {
                    "width": 100,
                    "height": 100
                }
            },
            {
                "color": "#03a9f4",
                "x": 635,
                "y": 276.5,
                "size": 100,
                "uuid": "19e1daf2-645b-446f-9988-a333d918da0e",
                "type": "Player",
                "name": "Neymar",
                "image": "PBlanc",
                "style": {
                    "width": 100,
                    "height": 100
                }
            }
        ]
    },
    "team_A": {
        "playerHasBall": "05cdb75b-a987-4b6c-8007-5495409e76fb",
        "tab": [{
                "color": "#03a9f4",
                "x": 591,
                "y": 188,
                "size": 100,
                "uuid": "a8e58472-9cb4-40f0-8409-5c6c9060f118",
                "type": "Ball",
                "name": "",
                "image": "Ball",
                "style": {
                    "width": 30,
                    "height": 30
                }
            },
            {
                "color": "#03a9f4",
                "x": 400.5,
                "y": 289.5,
                "size": 100,
                "uuid": "1367d74b-eaa4-4416-987c-1e55804e2570",
                "type": "Player",
                "name": "Cavani",
                "image": "PBlanc",
                "style": {
                    "width": 100,
                    "height": 100
                }
            },
            {
                "color": "#03a9f4",
                "x": 620.5,
                "y": 154,
                "size": 100,
                "uuid": "05cdb75b-a987-4b6c-8007-5495409e76fb",
                "type": "Player",
                "name": "Mbappe",
                "image": "PBleuFoot",
                "style": {
                    "width": 100,
                    "height": 100
                }
            },
            {
                "color": "#03a9f4",
                "x": 635,
                "y": 276.5,
                "size": 100,
                "uuid": "19e1daf2-645b-446f-9988-a333d918da0e",
                "type": "Player",
                "name": "Neymar",
                "image": "PBlanc",
                "style": {
                    "width": 100,
                    "height": 100
                }
            }
        ]
    },
    "situation": [{
            "color": "#03a9f4",
            "x": 654,
            "y": 499,
            "size": 100,
            "uuid": "445af3fa-0820-448f-bb27-54784398bf0a",
            "type": "Player",
            "name": "",
            "image": "PBlanc",
            "style": {
                "width": 100,
                "height": 100
            }
        },
        {
            "color": "#03a9f4",
            "x": 620.5,
            "y": 154,
            "size": 100,
            "uuid": "05cdb75b-a987-4b6c-8007-5495409e76fb",
            "type": "Player",
            "name": "Mbappe",
            "image": "PBleuFoot",
            "style": {
                "width": 100,
                "height": 100
            }
        },
        {
            "color": "#03a9f4",
            "x": 635,
            "y": 276.5,
            "size": 100,
            "uuid": "19e1daf2-645b-446f-9988-a333d918da0e",
            "type": "Player",
            "name": "Neymar",
            "image": "PBlanc",
            "style": {
                "width": 100,
                "height": 100
            }
        },
        {
            "color": "#03a9f4",
            "x": 406.5,
            "y": 413,
            "size": 100,
            "uuid": "a694ebea-9f8a-4262-9d2c-d366788afd33",
            "type": "Player",
            "name": "",
            "image": "PBleu",
            "style": {
                "width": 100,
                "height": 100
            }
        },
        {
            "color": "#03a9f4",
            "x": 442.5,
            "y": 318.5,
            "size": 100,
            "uuid": "ec16b71e-4b78-4452-9dea-2d96c4b0486d",
            "type": "Player",
            "name": "",
            "image": "PBleu",
            "style": {
                "width": 100,
                "height": 100
            }
        },
        {
            "color": "#03a9f4",
            "x": 482.5,
            "y": 294,
            "size": 100,
            "uuid": "e2158c5f-5aff-43fb-8707-d7746ddc0527",
            "type": "Player",
            "name": "",
            "image": "PBleu",
            "style": {
                "width": 100,
                "height": 100
            }
        },
        {
            "color": "#03a9f4",
            "x": 545,
            "y": 245.5,
            "size": 100,
            "uuid": "119403e8-0b09-4a95-acf1-f3a40033f094",
            "type": "Player",
            "name": "",
            "image": "PBleu",
            "style": {
                "width": 100,
                "height": 100
            }
        },
        {
            "color": "#03a9f4",
            "x": 716,
            "y": 189.5,
            "size": 100,
            "uuid": "30cc49cf-fd73-4827-97d0-e6f1c601d5cb",
            "type": "Player",
            "name": "",
            "image": "PBleu",
            "style": {
                "width": 100,
                "height": 100
            }
        },
        {
            "color": "#03a9f4",
            "x": 591,
            "y": 188,
            "size": 100,
            "uuid": "a8e58472-9cb4-40f0-8409-5c6c9060f118",
            "type": "Ball",
            "name": "",
            "image": "Ball",
            "style": {
                "width": 30,
                "height": 30
            }
        },
        {
            "color": "#03a9f4",
            "x": 400.5,
            "y": 289.5,
            "size": 100,
            "uuid": "1367d74b-eaa4-4416-987c-1e55804e2570",
            "type": "Player",
            "name": "Cavani",
            "image": "PBlanc",
            "style": {
                "width": 100,
                "height": 100
            }
        }
    ]
};

const answers = [{
        "question": "Vous êtes le joueur J1, Que devriez vous faire pour que votre équipe garde le ballon?",
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

//============================================================================
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
const questionv2 = new QuestionCollectifV2(situation3, answers3);
module.exports = questionv2;