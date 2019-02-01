const Team = require("../model/team");

class TeamFactory {

    createTeam(teamName) {
        const team = new Team();
        team.name = teamName;
        return team;
    }
}

module.exports = TeamFactory;