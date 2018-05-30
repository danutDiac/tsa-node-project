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

const newId = daysArray => {
  if (daysArray.length === 0) return 0;
  else return daysArray[daysArray.length - 1]["id"] + 1;
};

const writeDaysOff = (daysOff, json) => {
  daysOff.push(json);

  fs.writeFile("db/daysOff.json", JSON.stringify(daysOff), err => {
    if (err) console.log(err);
  });
};

const bookDaysOff = (request, response) => {
  let daysOff = require("../../db/daysOff.json");
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
      id: newId(daysOff),
      userId: body["userId"],
      daysOff: daysOffArray
    };

    writeDaysOff(daysOff,newJson);

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
  bookDaysOff
};
