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
    },
    {
        id: 3,
        category: categories.cultureG,
        question: "Quel était le score du match d'ouverture de la Coupe du Monde en 2018 entre la Russie et l'Arabie Saoudite ?",
        illustration: null,
        responses: [
            {
                id: 1,
                response: "2-0",
                isValid: false,
            },
            {
                id: 2,
                response: "3-1",
                isValid: false,
            },
            {
                id: 3,
                response: "0-0",
                isValid: false,
            },
            {
                id: 4,
                response: "5-0",
                isValid: true
            }
        ],
        anecdote: "3 des 5 buts russes ont été marqués par 2 joueurs qui sont sortis du banc : Cheryshev (2 buts) et Dzyuba (1 but).",
    },
    {
        id: 4,
        category: categories.cultureG,
        question: "Barcelone a remporté le titre de Champions League en 2015. Contre qui ont-ils joué dans la finale ?",
        illustration: null,
        responses: [
            {
                id: 1,
                response: "Juventus",
                isValid: true,
            },
            {
                id: 2,
                response: "Bayen Munich",
                isValid: false,
            },
            {
                id: 3,
                response: "Atletico Madrid",
                isValid: false,
            },
            {
                id: 4,
                response: "Chelsea",
                isValid: false
            }
        ],
        anecdote: "Le milieu de terrain Andres Iniesta Barcelonais est le premier joueur à aider dans différents buts en trois finales de la Ligue des Champions.",
    },
    {
        id: 5,
        category: categories.cultureG,
        question: "Qui a été élu meilleur joueur de la Coupe du monde 2014 ?",
        illustration: null,
        responses: [
            {
                id: 1,
                response: "Manuel Neuer",
                isValid: false,
            },
            {
                id: 2,
                response: "Cristiano Ronaldo",
                isValid: false,
            },
            {
                id: 3,
                response: "Lionel Messi",
                isValid: true,
            },
            {
                id: 4,
                response: "Franck Ribéry",
                isValid: false
            }
        ],
        anecdote: null,
    },
];

module.exports = simplesQuestions;