const chai = require("chai")

describe("retriveAlreadyBookedDays module actions", (done) => {
    const daysOff = [
        {"id": 0,
         "userId": 0,
         "daysOff": [2018-06-04, 2018-06-05]
        },

        {"id": 1,
         "userId": 1,
         "daysOff": [2018-06-20, 2018-06-21]
        },

        {"id": 2,
         "userId": 0,
         "daysOff": [2018-08-23, 2018-08-24, 2018-08-27, 2018-08-28]
        }
    ]
    describe("findBookedDays function tests", done => {

        it("Should return an array with the days already booked by user with id 0", done => {
            const { findBookedDays } = require("../src/actions/retriveAlreadyBookedDaysActions");
            const userId = 0
            const bookedDays = findBookedDays(userId, daysOff);
            const result = [2018-06-04, 2018-06-05,2018-08-23, 2018-08-24, 2018-08-27, 2018-08-28]

            chai.expect(bookedDays).to.deep.equal(result);
            done();
        })

        it("should return an empty array for user with id 2", done => {
            const { findBookedDays } = require("../src/actions/retriveAlreadyBookedDaysActions");
            const userId = 2;
            const bookedDays = findBookedDays(userId, daysOff);
            const result = [];

            chai.expect(bookedDays).to.deep.equal(result);
            done()
        })
            })

    describe("getAlreadyBookedDays function tests", done => {

        it("Should return the message 'User not found/no days booked yet', for user with id 2", done => {
        const { getAlreadyBookedDays } = require("../src/actions/retriveAlreadyBookedDaysActions");
        const userId = 2;
        const result = {
            "status" : 404,
            "message": "User not found/no days booked yet"
        }
        getAlreadyBookedDays(userId, daysOff)
            .catch(err => {
                chai.expect(err).to.deep.equal(result);
                done();
            })
        })
    })

})