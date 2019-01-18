const tab = [{ A: '', 'B': '' }, { 'A': '', 'B': '' }, { 'A': '', 'B': '' }];

class Session {


    constructor() {
        this.sessionA = new Map();
        this.sessionB = new Map();

        this.sessions = new Map();
        this.sessions.set('A', this.sessionA);
        this.sessions.set('B', this.sessionB);
        this.tab = [];
        this.tab.push({ "A": '', "B": '' });
        this.tab.push({ "A": '', "B": '' });
        this.tab.push({ "A": '', "B": '' });
    }


    setJSON(size, team, pseudo) {
        if (size >= 0 && size < 3) {
            if (team === 'A') {
                this.tab[size].A = pseudo;
            } else {
                this.tab[size].B = pseudo;
            }
        }
    }

    getTab() {
        return this.tab;
    }

    add(team, pseudo, socket) {
        let map = this.sessions.get(team);
        let size = map.size;
        if (size < 3) {
            map.set(pseudo, socket);
            this.setJSON(size, team, pseudo);
            return true;
        }
        return false;
    }

    remove(pseudo, team) {
        let map = this.sessions.get(team);
        if (map) {
            let size = Array.from(map.keys()).indexOf(1);
            this.setJSON(size, team, '');
            map.delete(pseudo);
        }
    }

}

module.exports = Session;