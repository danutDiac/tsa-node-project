let fs = require('fs')
let daysOff = require('../../db/daysOff.json')

let deleteDaysOff = (req, res) => {
    let id = req.params.id
    let found = false
    let index;
    for (let i = 0; i < daysOff.length; i++) {
        if (id == daysOff[i].id) {
            found = true
            index = i
        }
    }
    if (found) {
        daysOff.splice(index, 1)
        fs.writeFile('../../db/daysOff.json', JSON.stringify(daysOff), function (err) {
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
    deleteDaysOff
}