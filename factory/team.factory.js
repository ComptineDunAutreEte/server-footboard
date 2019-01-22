const Team = require("../model/team");

class TeamFactory {

    createTeam(teamName, playerNumber) {
        const team = new Team();
        team.name = teamName;
        team.playerNumber = playerNumber;
        return team;
    }
}

module.exports = TeamFactory;