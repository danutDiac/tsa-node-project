const { readFile, findItemById, parseJSON } = require("../helpers/helpers");

const getUserFromDB = (userID, db) => {
    return new Promise((resolve, reject) => {
        let user = findItemById(db, userID);
        if (user === undefined)
            reject({
                "status": 404,
                "message": "User not found"
            });
        else {
            resolve(user);
        }
    })
}

const sendResponse = (request, response, user) => {
    return new Promise((resolve, reject) => {
        try {
            user.links = {
                "PUT": `http://localhost:3000/users${Number(request.params.id)}`,
                "PATCH": `http://localhost:3000/users${Number(request.params.id)}`,
                "DELETE": `http://localhost:3000/users${Number(request.params.id)}`
            }
            response.status(200).send(user);
            resolve()
        }
        catch (err) {
            reject(err);
        }
    })
}

const parseJSONFromFile = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path)
            .then(parseJSON)
            .then(resolve)
            .catch(error => {
                reject({
                    status: 500,
                    message: 'the error was logged and we’ll be checking it shortly'
                })
            })
    })
}

const sendError = (response, err) => {
    response.status(err["status"]).json({ "error": err["message"] });
}


let getUser = (request, response) => {
    parseJSONFromFile("db/users.json")
        .then(getUserFromDB.bind(null, Number(request.params.id)))
        .then(sendResponse.bind(null, request, response))
        .catch(sendError.bind(null, response))
};

module.exports = { getUser };

