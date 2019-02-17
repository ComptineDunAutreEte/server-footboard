class GameService {

    determineWhichTeamPlayInFirst(teams) {
        return teams[Math.floor(Math.random() * teams.length)];
    }

    retrievePlayerOrderWhichPlay(playersTime) {
        playersTime = playersTime.filter((pt) => pt.isGoodResponse === true);

        return playersTime.sort((a, b) => {
            if (a.responseTime < b.responseTime) {
                return -1;
            } else if (a.responseTime === b.responseTime) {
                return 0;
            } else {
                return 1;
            }
        });
    }
}

module.exports = GameService;