const fs = require("fs");
const { readFile, writeFile, findItemById } = require("../helpers/helpers");

let deleteUserFromDatabase = (users, user) => {
    let index = users.indexOf(user);
    if (index >= 0) users.splice(index, 1);
};

let deleteUser = (req, res) => {
    readFile("db/users.json")
        .then(data => {
            let users = JSON.parse(data);
            let user = findItemById(users, Number(req.params.id));

            if (user) {
                deleteUserFromDatabase(users, user);

                writeFile("db/users.json", JSON.stringify(users))
                    .then(() => {
                        res.status(204).send();
                    })
                    .catch(error => {
                        res.status(500).json({
                            serverErrorMessage:
                                "the error was logged and we’ll be checking it shortly"
                        });
                    });
            }
            else {
                res.status(404).json({
                    message: 'User not found'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                serverErrorMessage:
                    "the error was logged and we’ll be checking it shortly"
            });
        });
};

module.exports = {
    deleteUserFromDatabase,
    deleteUser
};
