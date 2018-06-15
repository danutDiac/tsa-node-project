let DaysOff = require('../models/daysOffModel')
let mongoose = require("mongoose")

const calcDaysOff= days =>{
    let remainingDays = 21;
    days.forEach(day => {
        remainingDays -= day.daysOff.length;
    })
    return remainingDays
}

let getNumberOfDaysOff = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({
            message: "Bad request"
        })
     } else {
        DaysOff.find({userId: req.params.id})
            .then(daysOff => {
                if (!daysOff[0]) {
                    res.status(404).json({
                        message: "daysOff not found"
                    })
                    return
                } else {
                    res.status(200).json({
                        numberOfDaysOff: calcDaysOff(daysOff),
                        links: {
                            "GET": req.headers.host + req.baseUrl,
                            "POST": req.headers.host + req.baseUrl
                        }
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    serverErrorMessage: "the error was logged and we'll be checking it shortly"
                });
            })
    }
}

if (process.env.NODE_ENV == "dev") {
    module.exports = {
        getNumberOfDaysOff
    }
} else {
    module.exports = {
        getNumberOfDaysOff
    }
}
