const categories = require("../model/categories");

const simplesQuestions = [
    {
        id: 0,
        category: categories.cultureG,
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
        ],
        anecdote: "L'histoire du foot a commencé en 1863 en Angleterre. Les anglais ayant pour unité de mesure le yard et le pied, ils ont décidé que les cages mesureraient 8 yards de largeur, soit 7,32m, et 8 pieds de hauteur, soit 2,44m."
    },
    {
        id: 1,
        category: categories.cultureG,
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
        ],
        anecdote: null
    },
    {
        id: 2,
        category: categories.cultureG,
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
        ],
        anecdote: null,
    }
];

module.exports = simplesQuestions;