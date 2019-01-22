const easyQuestions = [
    {
        question: "Laquelle de ces affirmations est fausse ?\n" +
        "Un joueur ne se trouve pas en position de hors-jeu quand :",
        illustration: null,
        responses: [
            {
                response: "Il se trouve dans sa propre moitié de terrain",
                isValid: false,
            },
            {
                response: "Il se trouve à la même hauteur que le dernier adversaire",
                isValid: true,
            },
            {
                response: "Il se trouve à la même hauteur que les deux derniers adversaires",
                isValid: false,
            },
            {
                response: "Il se trouve derrière le ballon lors de la passe ou sur la meme ligne",
                isValid: false,
            },
        ]
    },
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
    }
];

module.exports = easyQuestions;