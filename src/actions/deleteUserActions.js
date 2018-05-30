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
                res.status(500).json({
                    serverErrorMessage: "the error was logged and we’ll be checking it shortly"
                })
            } else {
                res.status(204).send()
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