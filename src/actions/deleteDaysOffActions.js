let DaysOff = require('../models/daysOffModel')
let mongoose = require("mongoose")

let deleteDaysOff = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({
            message: "Bad request"
        })
    } else {
        DaysOff.findByIdAndRemove(req.params.id)
            .then(daysOff => {
                if (!daysOff) {
                    res.status(404).json({
                        message: "User not found"
                    })
                } else {
                    res.status(200).json({
                        deleteDaysOff: daysOff,
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
                });
            })
    }
}

if (process.env.NODE_ENV == "dev") {
    module.exports = {
        deleteDaysOff
    }
} else {
    module.exports = {
        deleteDaysOff
    }
}
