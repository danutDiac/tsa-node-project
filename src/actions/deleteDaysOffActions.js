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
                res.status(500).json({ "message": "Internal server error." })
            } else {
                res.status(200).json({ "message": "Days off deleted" })
            }
        })
    } else {
        res.status(404).json({ "message": "Not found!" })
    }
}

module.exports = {
    deleteDaysOff,
    findDaysOff,
    deleteDaysOffFromArray
}