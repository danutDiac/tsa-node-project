const chai = require('chai');

describe('Booking days module', () => {

    it("Should say that date \"2018-01-20\" is valid", (done) => {
        const { isDateValid } = require('../src/actions/bookingDaysOffActions');
        const date = "2018-01-20";
        const input = isDateValid(date);
        const result = true;

        chai.expect(input).to.deep.equal(result);
        done();
    })

    it("Should say that date \"A\" is invalid", (done) => {
        const { isDateValid } = require('../src/actions/bookingDaysOffActions');
        const date = "A";
        const input = isDateValid(date);
        const result = false;

        chai.expect(input).to.deep.equal(result);
        done();
    })

    it("Should say that date \"2018-00-50\" is invalid", (done) => {
        const { isDateValid } = require('../src/actions/bookingDaysOffActions');
        const date = "2018-00-50";
        const input = isDateValid(date);
        const result = false;

        chai.expect(input).to.deep.equal(result);
        done();
    })

    it("Should say that date \"undefined\" is invalid", (done) => {
        const { isDateValid } = require('../src/actions/bookingDaysOffActions');
        const date = undefined;
        const input = isDateValid(date);
        const result = false;

        chai.expect(input).to.deep.equal(result);
        done();
    })

    it("Should log days correctly for startdate = 2018-10-20 and enddate = 2018-10-30", (done) => {
        const { daysOffRangeToArray } = require('../src/actions/bookingDaysOffActions');
        const startDate = "2018-10-20";
        const endDate = "2018-10-30";
        daysOffRangeToArray(startDate, endDate)
        .then(input => {
            const result = [
                "2018-10-22",
                "2018-10-23",
                "2018-10-24",
                "2018-10-25",
                "2018-10-26",
                "2018-10-29",
                "2018-10-30"
            ];

            chai.expect(input).to.deep.equal(result);
            done();
        })
    })

    it("Should log days correctly for startdate = 2018-10-20 and enddate = 2018-11-04", (done) => {
        const { daysOffRangeToArray } = require('../src/actions/bookingDaysOffActions');
        const startDate = "2018-10-20";
        const endDate = "2018-11-04";
        daysOffRangeToArray(startDate, endDate)
        .then(input => {
            const result = [
                "2018-10-22",
                "2018-10-23",
                "2018-10-24",
                "2018-10-25",
                "2018-10-26",
                "2018-10-29",
                "2018-10-30",
                "2018-10-31",
                "2018-11-01",
                "2018-11-02",
            ];

            chai.expect(input).to.deep.equal(result);
            done();
        })
        .catch(error => {
            console.log(error);
        });
    })

    it("Should return [] for startdate = 2018-10-20 and enddate = 2018-10-10", (done) => {
        const { daysOffRangeToArray } = require('../src/actions/bookingDaysOffActions');
        const startDate = "2018-10-20";
        const endDate = "2018-10-10";
        daysOffRangeToArray(startDate, endDate)
        .catch(error => {
            chai.expect(error.message).to.deep.equal("End date lower than start date");
            done();
        })
    })

})