const mongoose = require("mongoose")
const chai = require("chai");
const chaiHttp = require("chai-http");
const config = require("../config/config")
const server = require("../src/main.js");
const User = require("../src/models/userModel")
const DaysOff = require("../src/models/daysOffModel")
const should = chai.should();
chai.use(chaiHttp);

describe(" GET number of days off users/getNumberOfDaysOff/:id", () => {
    let id="";
    before(function (done) {
        mongoose.connect(config.mongoUrl).then(() => {
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
    after(function(done){
        mongoose.connection.db.dropDatabase()
        done()
    })
    it("should return status 200 for id found", function (done) {
        chai.request(server).get(`/users/getNumberOfDaysOff/${id}`)
            .end(function (err, res) {
                res.should.have.status(200)
                done()
            })
    })
    it("should return 400 if id not found", function (done) {
        chai.request(server).get(`/users/getNumberOfDaysOff/123456789abcd1efg2hi1234`)
            .end(function (err, res) {
                res.should.have.status(400)
                done()
            })
    })
    it("should return 404 if id not found", function (done) {
        chai.request(server).get(`/users/getNumberOfDaysOff/5b1a7c96d02bc01fd861cab1`)
            .end(function (err, res) {
                res.should.have.status(404)
                done()
            })
    })
})