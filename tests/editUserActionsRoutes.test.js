const mongoose = require("mongoose")
const chai = require('chai')
const chaiHttp = require('chai-http')
const config = require("../config/config")
const server = require('../src/main')
const User = require("../src/models/userModel")
const should = chai.should()
chai.use(chaiHttp)

let userTest1 = {
    "firstName": "AAA",
    "lastName": "BBBB",
    "email": "bygby@w.com",
    "phone": "0749966666"
}
let userTest2 = {
    "firstName": "AAABB",
    "lastName": "BBBBAA",
    "email": "iuynyn@w.com",
    "phone": "0759966666"
}
let userTest3 = {
    "firstName": "1AAABB",
    "lastName": "BBBBAA",
    "email": "iuynynw.com",
    "phone": "0759966666"
}

describe('UPDATE /users/:id', function () {
    let id="";
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
                    id = user._id
                    console.log(user._id)
                    done()
                })
                .catch(err => {
                    done()
                });
        })
    })
    it("should return status 200 for id found for put", function (done) {
        chai.request(server).put(`/users/${id}`).send(userTest1, userTest2,1)
            .end(function (err, res) {
                res.should.have.status(200)
                done()
            })
    })
    
    it("should return 400 when data inserted does not pass validation test for put", function (done) {
        chai.request(server).put(`/users/${id}`).send(userTest3,userTest1,1)
            .end(function (err, res) {
                res.should.have.status(400)
                done()
            })
    })

    it("should return status 200 for id found for patch", function (done) {
        chai.request(server).patch(`/users/${id}`).send(userTest1, userTest2,0)
            .end(function (err, res) {
                res.should.have.status(200)
                done()
            })
    })
    
    it("should return 400 when data inserted does not pass validation test fost patch", function (done) {
        chai.request(server).patch(`/users/${id}`).send(userTest3,userTest1,0)
            .end(function (err, res) {
                res.should.have.status(400)
                done()
            })
    })
})