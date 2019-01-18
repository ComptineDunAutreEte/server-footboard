const tab = [{ A: '', B: '' }, { A: '', B: '' }, { A: '', B: '' }];
class Session {
    constructor() {
        this.sessionA = new Map();
        this.sessionB = new Map();

        this.sessions = new Map();
        this.sessions.set('A', this.sessionA);
        this.sessions.set('B', this.sessionB);
    }


    setJSON(size, team, pseudo) {
        if (team === A) {
            tab[size - 1].A = pseudo;
        } else {
            tab[size - 1].b = pseudo;
        }
    }

    getTab() {
        return tab;
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