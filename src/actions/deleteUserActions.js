const fs = require('fs')

let findUser = (users, id) => {
    return users.find(e => e.id == id)
}

let deleteUserFromDatabase = (users, user) => {
    let index = users.indexOf(user)
    if (index >= 0) users.splice(index, 1)
}

let deleteUser = (req, res) => {
    let users = require('../../db/users.json')
    let user = findUser(users, req.params.id)
    if (user) {
        deleteUserFromDatabase(users, user)
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
    findUser,
    deleteUserFromDatabase,
    deleteUser
}