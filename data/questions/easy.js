const easyQuestions = [

    {
        question: "Quelles sont les dimentions des cages ?",
        illustration: null,
        responses: [
            {
                response: "Largeur : 7,32m Hauteur : 2,44m",
                isValid: true,
                time: null
            },
            {
                response: "Largeur : 7m Hauteur : 2,5m",
                isValid: true,
                time: null
            },
            {
                response: "Largeur : 7,51m Hauteur : 2,32m",
                isValid: false,
                time: null
            },
            {
                response: "Largeur : 7,83m Hauteur : 2,6m",
                isValid: false,
                time: null
            },
        ]
    },
    {
        question: "Quelle est l'equipe qui detient le plus grand nombre de titre de champion de France ?",
        illustration: null,
        responses: [
            {
                response: "Saint-Etienne",
                isValid: true,
                time: null
            },
            {
                response: "Paris",
                isValid: true,
                time: null
            },
            {
                response: "Marseille",
                isValid: false,
                time: null
            },
            {
                response: "Reims",
                isValid: false,
                time: null
            },
        ]
    },
];

module.exports = easyQuestions;