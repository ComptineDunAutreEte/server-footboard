const categories = require("../../model/categories");
const levels = require("../../model/levels");

const easyQuestions = [
    {
        id: 0,
        category: categories.cultureG,
        type: "",
        difficulty: levels.easy,
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
                isValid: false,
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
    }
];

module.exports = easyQuestions;