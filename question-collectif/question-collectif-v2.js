class QuestionCollectifV2 {
    constructor(situation, answers) {
        this.situation = situation;
        this.answers = answers;
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

const questionv2 = new QuestionCollectifV2(situation, answers);
module.exports = questionv2;