const chai = require('chai');

describe('Booking days module', () => {

    it("Should say that date \"2018-01-20\" is valid", () => {
        const { isDateValid } = require('../src/actions/bookingDaysOffActions');
        const date = "2018-01-20";
        const input = isDateValid(date);
        const result = true;

        chai.expect(input).to.deep.equal(result);
    })

    it("Should say that date \"A\" is invalid", () => {
        const { isDateValid } = require('../src/actions/bookingDaysOffActions');
        const date = "A";
        const input = isDateValid(date);
        const result = false;

        chai.expect(input).to.deep.equal(result);
    })

    it("Should say that date \"2018-00-50\" is invalid", () => {
        const { isDateValid } = require('../src/actions/bookingDaysOffActions');
        const date = "2018-00-50";
        const input = isDateValid(date);
        const result = false;

        chai.expect(input).to.deep.equal(result);
    })

    it("Should say that date \"undefined\" is invalid", () => {
        const { isDateValid } = require('../src/actions/bookingDaysOffActions');
        const date = undefined;
        const input = isDateValid(date);
        const result = false;

        chai.expect(input).to.deep.equal(result);
    })

    it("Should log days correctly for startdate = 2018-10-20 and enddate = 2018-10-30", () => {
        const { createDaysOffArray } = require('../src/actions/bookingDaysOffActions');
        const startDate = new Date("2018-10-20");
        const endDate = new Date("2018-10-30");
        const input = createDaysOffArray(startDate, endDate);
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
    })

    it("Should log days correctly for startdate = 2018-10-20 and enddate = 2018-11-04", () => {
        const { createDaysOffArray } = require('../src/actions/bookingDaysOffActions');
        const startDate = new Date("2018-10-20");
        const endDate = new Date("2018-11-04");
        const input = createDaysOffArray(startDate, endDate);
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
    })

    it("Should return [] for startdate = 2018-10-20 and enddate = 2018-10-10", () => {
        const { createDaysOffArray } = require('../src/actions/bookingDaysOffActions');
        const startDate = new Date("2018-10-20");
        const endDate = new Date("2018-10-10");
        const input = createDaysOffArray(startDate, endDate);
        const result = [];

        chai.expect(input).to.deep.equal(result);
    })
    
})