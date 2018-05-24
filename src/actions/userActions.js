let findUser = (users, id) => {
    if (id < 0) return false;
    for (let user of users) {
        if (user["userId"] === id) {
            return user;
        }
    }
    return false;
}

let getUser = (request, response) => {
    try {
        let users = require("../../db/users.json");
        console.log(users)
        let user = findUser(users, Number(request.params.id));

        if (user !== false) {
            response.json(user);
        }
        else {
            response.status(404);
            response.json({
                "error": "User not found"
            });
        }
    }
    catch (err) {
        response.status(500);
        response.json({
            "error": "Internal server error"
        });
    }
}

module.exports = getUser;