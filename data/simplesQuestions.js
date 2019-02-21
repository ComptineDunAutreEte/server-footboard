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
        question: "La coupe du Monde FIFA 2018 a été organisée dans quel pays ?",
        illustration: null,
        responses: [
            {
                id: 1,
                response: "Etats-Unis",
                isValid: false,
            },
            {
                id: 2,
                response: "Russie",
                isValid: true,
            },
            {
                id: 3,
                response: "Allemagne",
                isValid: false,
            },
            {
                id: 4,
                response: "Chine",
                isValid: false
            }
        ],
        anecdote: "Fait amusant, le Mexique détient le record pour la plupart des défaites dans l'histoire de la coupe du monde. Ils ont perdu 27 matchs.",
    },
    {
        id: 6,
        category: categories.cultureG,
        question: "Quel animal fut nommé Zabivaka et choisi pour être la mascotte de la Coupe du Monde 2018 ?",
        illustration: null,
        responses: [
            {
                id: 1,
                response: "Un ours",
                isValid: false,
            },
            {
                id: 2,
                response: "Un tigre de Sibérie",
                isValid: false,
            },
            {
                id: 3,
                response: "Un aigle",
                isValid: false,
            },
            {
                id: 4,
                response: "Un loup",
                isValid: true
            }
        ],
        anecdote: "Le loup de Zabivaka a été conçu par l'étudiant russe Ekaterina Bocharova. La mascotte a été choisie par un vote en ligne.",
    },
    {
        id: 7,
        category: categories.cultureG,
        question: "Qui est le joueur le plus âgé à avoir réussi un coup du chapeau en Coupe du Monde ?",
        illustration: null,
        responses: [
            {
                id: 1,
                response: "Christiano Ronaldo",
                isValid: true,
            },
            {
                id: 2,
                response: "Pauleta",
                isValid: false,
            },
            {
                id: 3,
                response: "Rob Resenbrink",
                isValid: false,
            },
            {
                id: 4,
                response: "Eusebio",
                isValid: true
            }
        ],
        anecdote: "Ronaldo a marqué le 51ème coup du chapeau de la Coupe du Monde à 33 ans. Le dernier record était de Rensenbrink (30 ans, en 1978).",
    },
    {
        id: 8,
        category: categories.cultureG,
        question: "Qui était le dernier club Français à jouer en finale de la Ligue des Champions ?",
        illustration: null,
        responses: [
            {
                id: 1,
                response: "Saint-Étienne",
                isValid: false,
            },
            {
                id: 2,
                response: "Marseille",
                isValid: false,
            },
            {
                id: 3,
                response: "Monaco",
                isValid: true,
            },
            {
                id: 4,
                response: "Paris Saint Germain",
                isValid: false
            }
        ],
        anecdote: "En 2005, Monaco avait fait une belle course en battant le Real Madrid et Chelsea dans les étapes d'élimination, mais a perdu à Porto dans le 3-0 final.",
    },
];

module.exports = simplesQuestions;