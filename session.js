const tab = [{ A: '', 'B': '' }, { 'A': '', 'B': '' }, { 'A': '', 'B': '' }];

const TeamFactory = require("./factory/team.factory");
const teamName = require("./data/team-name");

class Session {
    constructor() {
        this.teams = [];
        this.initParty();
        this.table = null;
        this.indexA = 0;
    }

    initParty() {
        const teamFactory = new TeamFactory();

        const teamA = teamFactory.createTeam(teamName[0]);
        const teamB = teamFactory.createTeam(teamName[1]);

        this.teams.push(teamA);
        this.teams.push(teamB);
    }

    reset() {
        this.getTeam('A').players.clear();
        this.getTeam('B').players.clear();
        this.indexA = 0;
    }

    add(player, socket) {
        let isUserAdded = false;

        this.teams.forEach((team) => {
            if (team.name === player.team && team.players.size < 3) {
                console.log("if");
                team.players.set(player.uuid, player);
                player.session = socket;

                isUserAdded = true;
            }
        });

        return isUserAdded;
    }

    getTeam(teamName) {
        let selectedTeam;

        this.teams.forEach((team) => {
            if (team.name === teamName) {
                selectedTeam = team;
            }
        });

        return selectedTeam;
    }

    getPlayer(uuid) {
        let selectedPlayer;

        this.teams.forEach((team) => {
            team.players.forEach((player) => {
                if (player.uuid === uuid) {
                    selectedPlayer = player;
                }
            });
        });

        return selectedPlayer;
    }

    remove(pseudo, team) {
        let map = this.sessions.get(team);
        if (map) {
            let size = Array.from(map.keys()).indexOf(1);
            map.delete(pseudo);
        }
    }

}

module.exports = Session;