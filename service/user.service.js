class UserService {

    updateUser(game, user) {
        let isUserUpdated = false;

        game.teams.forEach((team) => {
            if (team.name === user.team) {
                const index = team.users.indexOf(user);
                team.users.splice(index, 1, user);
                isUserUpdated = true;
            }
        });

        return isUserUpdated;
    }

}

module.exports = UserService;

