let chai = require('chai');
const { countDays } = require("../src/actions/getNumberOfDaysOffActions");
const should = chai.should();

describe('Retrieve a number of available days off', () => {

    let users = [{ "id": 0, "userId": 0, "daysOff": ["2018-02-20", "2018-02-21"] },
    { "id": 1, "userId": 0, "daysOff": ["2018-02-22", "2018-02-23"] }]

    it("Should return 17 for userId=0", () => {
        let result = countDays(users)
        chai.expect(result).to.deep.equal("17");
    })
})