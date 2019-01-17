class Session {
    constructor() {
        this.sessionA = new Map();
        this.sessionB = new Map();

        this.sessions = new Map();
        this.sessions.set('A', this.sessionA);
        this.sessions.set('B', this.sessionB);
    }

    add(team, pseudo, socket) {
        let map = this.sessions.get(team);
        if (map.size < 3) {
            map.set(pseudo, socket);
            return true;
        }
        return false;
    }

    remove(pseudo, team) {
        let map = this.sessions.get(team);
        if (map) {
            map.delete(pseudo);
        }
    }

}

module.exports = Session;