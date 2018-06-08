let User = require("../models/userModel");
let mongoose = require("mongoose")

const deleteUser = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({
            message: "Bad request"
        })
    } else {
        User.findByIdAndRemove(req.params.id)
            .then(user => {
                if (!user) {
                    res.status(404).json({
                        message: "User not found"
                    })
                } else {
                    res.status(200).json({
                        deletedUser: user,
                        links: {
                            "GET": req.headers.host + req.baseUrl,
                            "POST": req.headers.host + req.baseUrl
                        }
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    serverErrorMessage: "the error was logged and we’ll be checking it shortly"
                })
            })
    }
}

if (process.env.NODE_ENV == "dev") {
    module.exports = {
        deleteUser
    }
} else {
    module.exports = {
        deleteUser
    }
}
