const fs = require("fs");
const { readFile } = require("../helpers/helpers");


let getNationalDays = (req, res) => {
    readFile("db/nationalDays.json")
        .then((data) => {
            let nationalDays = JSON.parse(data);
            res.status(200);
            res.json(nationalDays);
        })
        .catch((error) => {
            res.status(500);
            res.json({
                serverErrorMessage: "the error was logged and we’ll be checking it shortly"
            });
        });
};
module.exports = {
    getNationalDays
};