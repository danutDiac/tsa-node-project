let { readFile, writeFile, findItemById } = require('../helpers/helpers');

let deleteDaysOffFromArray = (daysOff, index) => {
    if (index >= 0) {
        daysOff.splice(index, 1);
    }
}

let deleteDaysOff = (req, res) => {
    readFile("db/daysOff.json")
    .then(data => {
        let daysOff = JSON.parse(data);
        let id = req.params.id;
        let result = findItemById(daysOff, Number(id));

        if (result) {
            deleteDaysOffFromArray(daysOff, Number(id));

            writeFile("db/daysOff.json", JSON.stringify(daysOff))
            .then(() => {
                res.status(204).send()
            })
            .catch(error => {
                response.status(500);
                response.json({
                    serverErrorMessage: "the error was logged and we’ll be checking it shortly"
                });
            })
        }
        else {
            res.status(404).json({ message: "Not found!" })
        }
    })
    .catch(error => {
        response.status(500);
        response.json({
            serverErrorMessage: "the error was logged and we’ll be checking it shortly"
        });
    })

}

if (process.env.NODE_ENV == "dev") {
    module.exports = {
        deleteDaysOff,
        deleteDaysOffFromArray
    }
} else {
    module.exports = {
        deleteDaysOff
    }
}
