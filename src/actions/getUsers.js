const { readFile, findItemById } = require("../helpers/helpers");

let getUser = (request, response) => {
    readFile("db/users.json")
        .then(data => {
            let users = JSON.parse(data);
            let user = findItemById(users, Number(request.params.id));

            if (user !== undefined) {
                response.json(user);
            } else {
                response.status(404);
                response.json({
                    error: "User not found"
                });
            }
        })
        .catch(error => {
            response.status(500);
            response.json({
                serverErrorMessage: "the error was logged and we’ll be checking it shortly"
            });
        });
};

module.exports = { getUser };
