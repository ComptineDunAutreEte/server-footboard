const hardQuestions = [
    {
        question: "Laquelle de ces affirmations est fausse ?\n" +
        "Un joueur ne se trouve pas en position de hors-jeu quand :",
        illustration: null,
        responses: [
            {
                id: 1,
                response: "Il se trouve dans sa propre moitié de terrain",
                isValid: false,
            },
            {
                id: 2,
                response: "Il se trouve à la même hauteur que le dernier adversaire",
                isValid: true,
            },
            {
                id: 3,
                response: "Il se trouve à la même hauteur que les deux derniers adversaires",
                isValid: false,
            },
            {
                id: 4,
                response: "Il se trouve derrière le ballon lors de la passe ou sur la meme ligne",
                isValid: false,
            },
        ]
    },
];

module.exports = hardQuestions;