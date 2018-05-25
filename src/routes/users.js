let router = require("express").Router();
let fs = require('fs')
let users = require('../../db/users.json')

router.delete('/:id', deleteUsers)

function deleteUsers(req, res) {
    let index = -1
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id) {
            index = i
        }
    }
    if (index >= 0) {
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

module.exports = router;