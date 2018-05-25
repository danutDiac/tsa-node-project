const fs = require('fs')

let findUser = (users, id) => {
    if (id < 0) return false;
    for (let user of users) {
        if (user["id"] === id) {
            return user;
        }
    }
    return false;
}

let getUser = (request, response) => {
    try {
        let users = require("../../db/users.json");
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

let deleteUser = (req, res) => {
    let users = require('../../db/users.json')
    let user = users.find(e => e.id == req.params.id)
    if (user) {
        let index = users.indexOf(user)
        users.splice(index, 1)
        fs.writeFile('db/users.json', JSON.stringify(users), function (err) {
            if (err) {
                res.status(500).json({ message: "Internal server error" })
            } else {
                res.status(200).json({ message: "User deleted" })
            }
        })
    } else {
        res.status(404).json({ message: "User not found" })
    }
}

module.exports = {
    getUser,
    findUser,
    deleteUser
}