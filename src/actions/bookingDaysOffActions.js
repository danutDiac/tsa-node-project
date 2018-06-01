const {
    readFile,
    writeFile,
    findItemById,
    newId
} = require("../helpers/helpers");

const isDateValid = date => {
    const regex = /([0-9]{4})(-)([1][0-2]|[0][1-9])(-)([0][1-9]|[1-2][0-9]|([3][0-1]))/;
    return date !== undefined && typeof date === "string" && regex.test(date) && (new Date(date).getFullYear()) <= (new Date().getFullYear() + 3);
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
        if (!isDateValid(body["endDate"])) {
            rejectStatus += "End date is invalid\n";
        }
        if (rejectStatus !== "") reject({
            "status": 400,
            "message": rejectStatus
        });
        resolve();
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
                "message": error
            });
        }
    })
}

const validateUserId = (users, id) => {
    return new Promise((resolve, reject) => {
        if (findItemById(users, id) === undefined) {
            reject({
                "status": 404,
                "message": "User not found"
            });
        }
        resolve();
    })
}

const formatDate = date => {
    if (date < 10) return `0${date}`;
    else return String(date);
}

const createDaysOffArray = (startDate, endDate) => {
    return new Promise((resolve, reject) => {
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        let daysOffArray = [];
        let month = "";
        let day = "";

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

const createNewJson = (daysOff, body, daysOffArray) => {
    return new Promise((resolve, reject) => {
        resolve({
            id: newId(daysOff),
            userId: body["userId"],
            daysOff: daysOffArray
        });
    })
}

const addNewJsonInArray = (daysOff, newJson) => {
    return new Promise((resolve, reject) => {
        daysOff.push(newJson);
        resolve(daysOff);
    })
}

const bookDaysOff = (request, response) => {
    let daysOffArray = undefined;
    let newJson = undefined;
    let daysOff = undefined;

    validateBody(request.body)
        .then(() => {
            return readFile("db/users.json");
        })
        .then(parseJSON)
        .then((users) => {
            return validateUserId(users, Number(request.body["userId"]))
        })
        .then(() => {
            return createDaysOffArray(request.body["startDate"], request.body["endDate"])
        })
        .then((createdDaysOffArray) => {
            daysOffArray = createdDaysOffArray;
            return readFile("db/daysOff.json")
        })
        .then(parseJSON)
        .then((createdDaysOff) => {
            daysOff = createdDaysOff;
            return createNewJson(daysOff, request.body, daysOffArray)
        })
        .then((createdJson) => {
            newJson = createdJson;
            return addNewJsonInArray(daysOff, newJson);
        })
        .then((daysOff) => {
            return writeFile("db/daysOff.json", JSON.stringify(daysOff));
        })
        .then(() => {
            response.status(200).json({
                "GET": `http://localhost:3000/days/${newJson["id"]}`,
                "PATCH": `http://localhost:3000/days/${newJson["id"]}`,
                "PUT": `http://localhost:3000/days/${newJson["id"]}`,
                "DELETE": `http://localhost:3000/days/${newJson["id"]}`
            });
        })
        .catch((error) => {
            response.status(error["status"]).json({
                "error": error["message"]
            });
        })
}

module.exports = {
    isDateValid,
    createDaysOffArray,
    bookDaysOff
};
