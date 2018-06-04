const {
    readFile,
    writeFile,
    findItemById,
    newId
} = require("../helpers/helpers");

const bookDaysOff = (request, response) => {
        const readAndParseUserFilePromise = readFile("db/users.json")
            .then(parseJSON);
            
        const readAndParseDaysOffFilePromise = readFile("db/daysOff.json")
            .then(parseJSON);

        const validateUserPromise = Promise.all([
            readAndParseUserFilePromise, 
            validateBody(request["body"])
        ])
            .then(([users, body]) => {
                return validateUserExists(users, body)
                    .then(() => body)
            })
            
        const createDaysOffPromise = (daysOff, body, daysOffArray) => createNewDaysOffJSON(daysOff, body, daysOffArray)
            .then(newDaysOffJSON => {
                return addNewDaysOffJSONInArray(daysOff, newDaysOffJSON)
                    .then(writeFile.bind(null, "db/daysOff.json"))
                    .then(sendResponse.bind(null, response, newDaysOffJSON));
            })


        validateUserPromise
            .then(body => {
                return Promise.all([
                    createDaysOffArray(body),
                    readAndParseDaysOffFilePromise
                ])
                    .then(([daysOffArray, daysOff]) => {
                        createDaysOffPromise(daysOff, body, daysOffArray);
                    })
            })
            .catch((error) => {
                console.log(error);
                sendError.bind(null, response)
            });
}

const isDateValid = date => {
    const regex = /([0-9]{4})(-)([1][0-2]|[0][1-9])(-)([0][1-9]|[1-2][0-9]|([3][0-1]))/;
    return date !== undefined && typeof date === "string" && regex.test(date) ;
}

const isDateIntervalOk = (date, dateName) => {
    if (new Date(date).getFullYear() > (new Date().getFullYear() + 3)) return dateName + " year should not be set 3 years in the future\n";
    else if (new Date(date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)) return  dateName + " should not be lower than today\n";
    else return "";
}

const validateBody = (body) => {
    return new Promise((resolve, reject) => {
        let rejectStatus = ""
        if (Number.isNaN(Number(body["userId"]))) {
            rejectStatus += "User id is not a number\n"
        }
        if (!isDateValid(body["startDate"])) {
            rejectStatus += "Start date is invalid\n";
        }
        rejectStatus += isDateIntervalOk(body["startDate"], "Start date");
        if (!isDateValid(body["endDate"])) {
            rejectStatus += "End date is invalid\n";
        }
        rejectStatus += isDateIntervalOk(body["endDate"], "End date");
        if (rejectStatus !== "") reject({
            "status": 400,
            "message": rejectStatus
        });

        resolve(body);
    });
}

const parseJSON = (data) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(JSON.parse(data));
        }
        catch (error) {
            reject({
                "status": 500,
                "message": "the error was logged and we’ll be checking it shortly"
            });
        }
    })
}

const validateUserExists = (users, body) => {
    return new Promise((resolve, reject) => {
        if (findItemById(users, body["userId"]) === undefined) {
            reject({
                "status": 404,
                "message": "User not found"
            });
        }
        resolve(body);
    })
}

const formatDate = date => {
    if (date < 10) return `0${date}`;
    else return String(date);
}

const createDaysOffArray = (body) => {
    return new Promise((resolve, reject) => {
        startDate = new Date(body["startDate"]);
        endDate = new Date(body["endDate"]);

        let daysOffArray = [];

        if (startDate > endDate) {
            reject({
                "status": 400,
                "message": "End date lower than start date"
            });
        }

        endDate.setDate(endDate.getDate() + 1);
        for (; startDate < endDate; startDate.setDate(startDate.getDate() + 1)) {
            if (startDate.getDay() > 0 && startDate.getDay() < 6) {
                daysOffArray.push(`${startDate.getFullYear()}-${formatDate(startDate.getUTCMonth() + 1)}-${formatDate(startDate.getDate())}`);
            }
        }
        
        resolve(daysOffArray);
    })
}

const createNewDaysOffJSON = (daysOff, body, daysOffArray) => {
    return new Promise((resolve, reject) => {
        resolve({
            id: newId(daysOff),
            userId: body["userId"],
            daysOff: daysOffArray
        });
        
    })
}

const addNewDaysOffJSONInArray = (daysOff, newDaysOffJSON) => {
    return new Promise((resolve, reject) => {
        daysOff.push(newDaysOffJSON);
        resolve(JSON.stringify(daysOff));
    })
}

const sendResponse = (response, newDaysOffJSON) => {
    return new Promise((resolve, reject) => {
        response.status(200).json({
            "GET": `http://localhost:3000/days/${newDaysOffJSON["id"]}`,
            "PATCH": `http://localhost:3000/days/${newDaysOffJSON["id"]}`,
            "PUT": `http://localhost:3000/days/${newDaysOffJSON["id"]}`,
            "DELETE": `http://localhost:3000/days/${newDaysOffJSON["id"]}`
        });
        resolve();
    })
}

const sendError = (response, error) => {
    response.status(error["status"]).json({
        "error": error["message"]
    });
}

module.exports = {
    isDateValid,
    isDateIntervalOk,
    validateBody,
    parseJSON,
    validateUserExists,
    formatDate,
    createDaysOffArray,
    createNewDaysOffJSON,
    bookDaysOff
};
