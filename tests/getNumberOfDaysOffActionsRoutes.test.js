const mongoose = require("mongoose")
const chai = require("chai");
const chaiHttp = require("chai-http");
const config = require("../config/config")
const server = require("../src/main.js");
const User = require("../src/models/userModel")
const DaysOff = require("../src/models/daysOffModel")
const should = chai.should();
chai.use(chaiHttp);

describe(" GET number of days off /:id/getNumberOfDaysOff", () => {
    let id="";
    beforeEach(function (done) {
        mongoose.connect(config.mongoUrl).then(() => {
            mongoose.connection.db.dropDatabase()
            let newUser = new User({
                "firstName": "Gigel",
                "lastName": "Ostafi",
                "email": "flo@w.com",
                "phone": "0749666666"
            })
            newUser.save()
                .then(user => {
                    id = user._id
                    let newDaysOff = new DaysOff({
                        userId: user._id,
                        daysOff: ["2018-02-20", "2018-02-21"]
                    })
                    newDaysOff.save().then(()=>{
                        done()
                    })
                })
                .catch(err => {
                    done()
                });
        })
    })
    it("should return status 200 for id found", function (done) {
        chai.request(server).get(`/days/${id}/getNumberOfDaysOff`)
            .end(function (err, res) {
                res.should.have.status(200)
                done()
            })
    })
    it("should return 404 if id not found", function (done) {
        chai.request(server).get(`/days/123456789abv/getNumberOfDaysOff`)
            .end(function (err, res) {
                res.should.have.status(404)
                done()
            })
    })
})