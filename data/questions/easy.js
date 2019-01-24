const easyQuestions = [
    {
        id: 1,
        question: "Quelles sont les dimentions des cages ?",
        illustration: null,
        responses: [
            {
                id: 1,
                response: "Largeur : 7,32m Hauteur : 2,44m",
                isValid: true,
                time: null
            },
            {
                id: 2,
                response: "Largeur : 7m Hauteur : 2,5m",
                isValid: true,
                time: null
            },
            {
                id: 3,
                response: "Largeur : 7,51m Hauteur : 2,32m",
                isValid: false,
                time: null
            },
            {
                id: 4,
                response: "Largeur : 7,83m Hauteur : 2,6m",
                isValid: false,
                time: null
            },
        ]
    },
    {
        id: 2,
        question: "Quelle est l'equipe qui detient le plus grand nombre de titre de champion de France ?",
        illustration: null,
        responses: [
            {
                id: 1,
                response: "Saint-Etienne",
                isValid: true,
                time: null
            },
            {
                id: 2,
                response: "Paris",
                isValid: true,
                time: null
            },
            {
                id: 3,
                response: "Marseille",
                isValid: false,
                time: null
            },
            {
                id: 4,
                response: "Reims",
                isValid: false,
                time: null
            },
        ]
    },
];

module.exports = easyQuestions;