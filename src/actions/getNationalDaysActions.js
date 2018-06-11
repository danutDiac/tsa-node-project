let NationalDays = require('../models/nationalDaysModel')


let getNationalDays = (req, res) => {
    NationalDays.find({})
    .then(nationalDays=>{
        res.status(200).json(nationalDays);
    })
    .catch(err =>{
        res.status(500).json({
            serverErrorMessage: "the error was logged and we’ll be checking it shortly"
        })
    })
}

module.exports = {
    getNationalDays
};