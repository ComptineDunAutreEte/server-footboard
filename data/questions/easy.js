const categories = require("../../model/categories");
const levels = require("../../model/levels");

const easyQuestions = [
    {
        id: 0,
        category: categories.cultureG,
        type: "",
        question: "Quelles sont les dimentions des cages ?",
        illustration: null,
        responses: [
            {
                id: 1,
                response: "Largeur : 7,32m Hauteur : 2,44m",
                isValid: true,
            },
            {
                id: 2,
                response: "Largeur : 7m Hauteur : 2,5m",
                isValid: false,
            },
            {
                id: 3,
                response: "Largeur : 7,51m Hauteur : 2,32m",
                isValid: false,
            },
            {
                id: 4,
                response: "Largeur : 7,83m Hauteur : 2,6m",
                isValid: false,
            },
        ]
    },
    {
        id: 1,
        category: categories.cultureG,
        type: "",
        question: "Qui a remporté le championnat de France de Ligue 1 au cours de la saison 1999/2000 ?",
        illustration: null,
        responses: [
            {
                id: 1,
                response: "Marseille",
                isValid: false,
            },
            {
                id: 2,
                response: "Monaco",
                isValid: true,
            },
            {
                id: 3,
                response: "Lyon",
                isValid: false,
            },
            {
                id: 4,
                response: "Bordeaux",
                isValid: false
            }
        ]
    },
    {
        id: 2,
        category: categories.cultureG,
        type: "",
        question: "En quelle année le PSG a t'il remporté la coupe des vainqueurs de coupes ?",
        illustration: null,
        responses: [
            {
                id: 1,
                response: "1993",
                isValid: false,
            },
            {
                id: 2,
                response: "1994",
                isValid: true,
            },
            {
                id: 3,
                response: "1995",
                isValid: false,
            },
            {
                id: 4,
                response: "1996",
                isValid: false
            }
        ]
    }
];

module.exports = easyQuestions;