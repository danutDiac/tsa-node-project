const mongoose = require("mongoose")
const chai = require("chai");
const chaiHttp = require("chai-http");
const config = require("../config/config")
const server = require("../src/main.js");
const User = require("../src/models/userModel")
const DaysOff = require("../src/models/daysOffModel")
const should = chai.should();
chai.use(chaiHttp);

describe("DELETE /days/:id", () => {
    let id
    beforeEach(function (done) {
        mongoose.connect(config.mongoUrl).then(() => {
            mongoose.connection.db.dropDatabase()
            let newUser = new User({
                "firstName": "Flow",
                "lastName": "Bamboozle",
                "email": "flo@w.com",
                "phone": "0749666666"
            })
            newUser.save()
                .then(user => {
                    let newDaysOff = new DaysOff({
                        userId: user._id,
                        daysOff: ["2018-02-20", "2018-02-21"]
                    })
                    newDaysOff.save().then(daysOff => {
                        id = daysOff._id
                        done()
                    })
                })
                .catch(err => {
                    done()
                });
        })
    })
    it("should return status 200 for id found", function (done) {
        chai.request(server).delete(`/days/${id}`)
            .end(function (err, res) {
                res.should.have.status(200)
                done()
            })
    })
    it("should return 404 if id not found", function (done) {
        chai.request(server).delete(`/days/123456789abv`)
            .end(function (err, res) {
                res.should.have.status(404)
                done()
            })
    })
    it("should return 400 for invalid id", function (done) {
        chai.request(server).delete(`/days/123456789ab`)
            .end(function (err, res) {
                res.should.have.status(400)
                done()
            })
    })
})