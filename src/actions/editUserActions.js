let User = require("../models/userModel");

const editUserPut = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => {
            res.status(200).json({
                updatedUser: user,
                links: {
                    "GET": req.headers.host + req.originalUrl,
                    "PUT": req.headers.host + req.originalUrl,
                    "DELETE": req.headers.host + req.originalUrl,
                    "POST": req.headers.host + req.baseUrl
                }
            })
        })
        .catch(err => {
            res.status(err["status"]).json({ "message": err["message"] })
        })
}

const editUserPatch = (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(user => {
            res.status(200).json({
                updatedUser: user,
                links: {
                    "GET": req.headers.host + req.originalUrl,
                    "PUT": req.headers.host + req.originalUrl,
                    "DELETE": req.headers.host + req.originalUrl,
                    "POST": req.headers.host + req.baseUrl
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                serverErrorMessage: "the error was logged and we’ll be checking it shortly"
            })
        })
}

if (process.env.NODE_ENV == "dev") {
    module.exports = {
        editUserPut,
        editUserPatch
    }
} else {
    module.exports = {
        editUserPut,
        editUserPatch
    }
}