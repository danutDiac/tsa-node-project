const fs = require("fs");
const {
    readFile,
    writeFile,
    findItemById,
    newId
} = require("../helpers/helpers");

const isDateValid = date => {
    const regex = /([2][0-9]{3})(-)([1][0-2]|[0][1-9])(-)([0][1-9]|[1-2][0-9]|([3][0-1]))/;
    return date !== undefined && typeof date === "string" && regex.test(date);
};

const createDaysOffArray = (startDate, endDate) => {
    let daysOffArray = [];
    let month = "";
    let day = "";

    if (startDate > endDate) return [];

    endDate.setDate(endDate.getDate() + 1);
    for (; startDate < endDate; startDate.setDate(startDate.getDate() + 1)) {
        if (startDate.getDay() > 0 && startDate.getDay() < 6) {
            if (startDate.getUTCMonth() + 1 < 10) {
                month = `0${startDate.getUTCMonth() + 1}`;
            } else {
                month = `${startDate.getUTCMonth() + 1}`;
            }
            if (startDate.getDate() < 10) {
                day = `0${startDate.getDate()}`;
            } else {
                day = `${startDate.getDate()}`;
            }
            daysOffArray.push(`${startDate.getFullYear()}-${month}-${day}`);
        }
    }

    return daysOffArray;
};

const createNewJson = (daysOff, body, daysOffArray) => {
    return {
        id: newId(daysOff),
        userId: body["userId"],
        daysOff: daysOffArray
    };
}

const bookDaysOff = (request, response) => {
    readFile("db/users.json")
    .then(data => {
        const users = JSON.parse(data);
        const body = request["body"];

        if (findItemById(users, Number(body["userId"])) !== undefined) {
            readFile("db/daysOff.json")
            .then(data => {
                let daysOff = JSON.parse(data);
                let daysOffArray = [];
        
                if (
                    isDateValid(body["startDate"]) &&
                    isDateValid(body["endDate"])
                ) {
                    const startDate = new Date(body["startDate"]);
                    const endDate = new Date(body["endDate"]);
                    daysOffArray = createDaysOffArray(startDate, endDate);
            
                    const newJson = createNewJson(daysOff, body, daysOffArray);
                    daysOff.push(newJson);
                    
                    writeFile("db/daysOff.json", JSON.stringify(daysOff))
                    .then(() => {
                        response.status(200).send(`/days/${newJson["id"]}`);
                    })
                    .catch(error => {
                        response.status(500).json({
                            serverErrorMessage: "the error was logged and we’ll be checking it shortly"
                        });
                    });
                } else {
                    response.status(400).json({
                        error: "Bad request"
                    });
                }
            })
            .catch(error => {
                response.status(500).json({
                    serverErrorMessage: "the error was logged and we’ll be checking it shortly"
                });
            })
        } else {
        response.status(400).json({
            error: "Bad request"
        });
    }
    })
    .catch(error => {
        response.status(500).json({
            serverErrorMessage: "the error was logged and we’ll be checking it shortly"
        });
    })

};

module.exports = {
    isDateValid,
    createDaysOffArray,
    bookDaysOff
};
