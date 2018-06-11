const DaysOff = require("../models/daysOffModel");
const User = require("../models/userModel");
const { getAlreadyBookedDays } = require("./retriveAlreadyBookedDaysActions")

const bookDaysOff = (request, response) => {
    const body = request.body;

    validateBody(body)
    .then(checkUserExistsInDB.bind(null, body.userId))
    .then(daysOffRangeToArray.bind(null, body.startDate, body.endDate))
    .then(removeDuplicateDaysOff.bind(null,body.userId))
    .then(createAndSaveDaysOffFlow.bind(null, body.userId))
    .then(sendResponse.bind(null, request, response))
    .catch(sendError.bind(null, response));
};

const isDateValid = date => {
    const regex = /([0-9]{4})(-)([1][0-2]|[0][1-9])(-)([0][1-9]|[1-2][0-9]|([3][0-1]))/;
    return date !== undefined && typeof date === "string" && regex.test(date);
};

const isDateIntervalOk = (date, dateName) => {
    if (new Date(date).getFullYear() > new Date().getFullYear() + 3)
    return dateName + " year should not be set 3 years in the future\n";
    else if (
        new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
    )
    return dateName + " should not be lower than today\n";
    else return "";
};

const validateBody = body => {
    return new Promise((resolve, reject) => {
        let rejectStatus = "";
        if (typeof body.userId !== "string") {
            rejectStatus += "User id is not a string\n";
        }
        if (!isDateValid(body.startDate)) {
            rejectStatus += "Start date is invalid\n";
        }
        rejectStatus += isDateIntervalOk(body.startDate, "Start date");
        if (!isDateValid(body.endDate)) {
            rejectStatus += "End date is invalid\n";
        }
        rejectStatus += isDateIntervalOk(body.endDate, "End date");
        if (rejectStatus !== "")
        reject({
            status: 400,
            message: rejectStatus
        });
    else resolve();
});
};

const checkUserExistsInDB = userId => {
    return new Promise((resolve, reject) => {
        let findUser = User.findById(userId, (err, user) => {
            if (err){
                reject({
                    status: 400,
                    message: "Bad user id"
                });
                return 
            }
            if (user) resolve();
            reject({
                status: 404,
                message: "User not found"
            });
        });
    });
};

const formatDate = date => {
    if (date < 10) return `0${date}`;
    else return String(date);
};

const daysOffRangeToArray = (startDate, endDate) => {
    return new Promise((resolve, reject) => {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        
        let daysOffArray = [];
        
        if (startDate > endDate) {
            reject({
                status: 400,
                message: "End date lower than start date"
            });
        }
        
        endDate.setDate(endDate.getDate() + 1);
        for (; startDate < endDate; startDate.setDate(startDate.getDate() + 1)) {
            if (startDate.getDay() > 0 && startDate.getDay() < 6) {
                daysOffArray.push(
                    `${startDate.getFullYear()}-${formatDate(
                        startDate.getUTCMonth() + 1
                    )}-${formatDate(startDate.getDate())}`
                );
            }
        }
        
        resolve(daysOffArray);
    });
};

const createUpdatedArray = (alreadyBookedDays, arrayOfDaysOff) => {
    let updatedDaysOff = [];
    for(let i=0; i<arrayOfDaysOff.length; i++){
        if(alreadyBookedDays.indexOf(arrayOfDaysOff[i]) === -1) 
            updatedDaysOff.push(arrayOfDaysOff[i])
    }
    return updatedDaysOff
}

const removeDuplicateDaysOff = (userId,arrayOfDaysOff) => {
   return new Promise((resolve,reject) => {
        getAlreadyBookedDays(userId)
            .then(alreadyBookedDays => {
                updatedDaysOff = createUpdatedArray(alreadyBookedDays, arrayOfDaysOff)
                if(updatedDaysOff.length === 0){
                    reject({
                        status: 422,
                        message: "This days are already booked"
                    })
                }
                resolve(updatedDaysOff);
            })
            .catch(err => {
                resolve(arrayOfDaysOff)
            })

        })
    
}

const createAndSaveDaysOffFlow = (userId, daysOffArray) => {
    return createNewDaysOffJSON(userId, daysOffArray).then(saveDayOffInDb);
};

const saveDayOffInDb = newDaysOff => {
    return new Promise((resolve, reject) => {
        let newDays = new DaysOff(newDaysOff);
        newDays.save((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};

const createNewDaysOffJSON = (userId, daysOffArray) => {
    return new Promise((resolve, reject) => {
        resolve({
            userID: userId,
            daysOff: daysOffArray
    });
});
};

const sendResponse = (request, response, newDaysOffJSON) => {
    return new Promise((resolve, reject) => {
        try {
            response.status(200).json({
                GET: `${request.headers.host}/days/${newDaysOffJSON._id}`,
                PATCH: `${request.headers.host}/days/${newDaysOffJSON._id}`,
                PUT: `${request.headers.host}/days/${newDaysOffJSON._id}`,
                DELETE: `${request.headers.host}/days/${newDaysOffJSON._id}`
            });
            resolve();
        } catch (err) {
            reject(err);
        }
    });
};

const sendError = (response, err) => {
    response.status(err.status).json({
        error: err.message
    });
};



if (process.env.NODE_ENV === "dev") {
    module.exports = {
        isDateValid,
        isDateIntervalOk,
        validateBody,
        formatDate,
        daysOffRangeToArray,
        bookDaysOff,
        createUpdatedArray,
        removeDuplicateDaysOff
    };
} else {
    module.exports = {
        bookDaysOff
    };
}