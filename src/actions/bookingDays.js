const fs = require("fs");
const { findUser } = require("./getUsers");

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

const maxId = daysArray => {
    let max = 0;

    daysArray.forEach(item => {
        if (max < item["id"]) {
            max = item["id"];
        }
    });

    return max;
};

const writeDaysOff = json => {
    let daysOff = require("../../db/daysOff.json");
    daysOff.push(json);

    fs.writeFile("db/daysOff.json", JSON.stringify(daysOff), err => {
        if (err) console.log(err);
    });
};

const bookDaysOff = (request, response) => {
    const body = request["body"];
    let daysOffArray = [];

    if (
        findUser(require("../../db/users.json"), Number(body["userId"])) !==
            false &&
        isDateValid(body["startDate"]) &&
        isDateValid(body["endDate"])
    ) {
        const startDate = new Date(body["startDate"]);
        const endDate = new Date(body["endDate"]);
        daysOffArray = createDaysOffArray(startDate, endDate);

        const newJson = {
            id: maxId(require("../../db/daysOff.json")) + 1,
            userId: body["userId"],
            daysOff: daysOffArray
        };

        writeDaysOff(newJson);

        response.status(200).send(`/days/${newJson["id"]}`);
    } else {
        response.status(400).send(
            JSON.stringify({
                error: "Bad request"
            })
        );
    }
};

module.exports = {
    isDateValid,
    createDaysOffArray,
    bookDaysOff,
    maxId
};
