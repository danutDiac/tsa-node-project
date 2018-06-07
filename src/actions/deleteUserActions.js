let User = require("../models/userModel");

const deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.status(500).json({
                serverErrorMessage: "the error was logged and we’ll be checking it shortly"
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
