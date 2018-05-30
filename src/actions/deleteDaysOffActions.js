let fs = require('fs')
let daysOff = require('../../db/daysOff.json')

let findDaysOff = id => {
    return daysOff.find(e => e.id == id)
}

let deleteDaysOffFromArray = (daysOff, index) => {
    if (index >= 0) {
        daysOff.splice(index, 1);
    }
}

let deleteDaysOff = (req, res) => {
    let id = req.params.id;
    let result = findDaysOff(id);
    if (result) {
        deleteDaysOffFromArray(daysOff, result);
        fs.writeFile('db/daysOff.json', JSON.stringify(daysOff), err => {
            if (err) {
                res.status(500).json({
                    serverErrorMessage: "the error was logged and we’ll be checking it shortly"
                })
            } else {
                res.status(204).send()
            }
        })
    } else {
        res.status(404).json({ message: "Not found!" })
    }
}

module.exports = {
    deleteDaysOff,
    findDaysOff,
    deleteDaysOffFromArray
}