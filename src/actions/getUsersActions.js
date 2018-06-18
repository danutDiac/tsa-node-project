const User = require("../models/userModel");
const {
    getUserFromDB
} = require("../helpers/helpers");

const sendResponse = (request, response, user) => {
    return new Promise((resolve, reject) => {
        try {
            let returnData = {
                user: user,
                links: {
                    PUT: `${request.headers.host}${request.originalUrl}`,
                    PATCH: `${request.headers.host}${request.originalUrl}`,
                    DELETE: `${request.headers.host}${request.originalUrl}`
                }
            }
            response.status(200).send(returnData);
            resolve();
        } catch (err) {
            console.log(err);
            reject({
                status: 500,
                message: "the error was logged and we’ll be checking it shortly"
            });
        }
    });
};

const sendError = (response, err) => {
    response.status(err["status"]).json({
        error: err["message"]
    });
};

let getUser = (request, response) => {
    getUserFromDB(request.params.id)
        .then(sendResponse.bind(null, request, response))
        .catch(sendError.bind(null, response));
};

if (process.env.NODE_ENV === "dev") {
    module.exports = {
        getUserFromDB,
        getUser
    };
} else {
    module.exports = {
        getUser
    };
}