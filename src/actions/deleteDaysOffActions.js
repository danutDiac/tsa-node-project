let DaysOff = require('../models/daysOffModel')

let deleteDaysOff = (req, res) => {
    DaysOff.findByIdAndRemove(req.params.id)
        .then(daysOff => {
            res.status(200).json({
                deleteDaysOff: daysOff,
                links: {
                    "GET": req.headers.host + req.baseUrl,
                    "POST": req.headers.host + req.baseUrl
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                serverErrorMessage: "the error was logged and we’ll be checking it shortly"
            });
        })
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
