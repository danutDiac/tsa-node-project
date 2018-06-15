const chai = require("chai")
const mongoose = require("mongoose")
const config = require("../config/config")
const DaysOff = require("../src/models/daysOffModel");
const User = require("../src/models/userModel");
const { findBookedDays, createArrayOffBookedDaysOff, getAlreadyBookedDays } = require("../src/actions/retriveAlreadyBookedDaysActions")

describe("retriveAlreadyBookedDays module actions", (done) => {

    describe("findBookedDays function tests", done => {
        before((done) => {
            mongoose.connect(config.mongoUrl).then(() => {
                mongoose.connection.db.dropDatabase()
                const newUser = new User({
                    "firstName": "Gigel",
                    "lastName": "Costache",
                    "email": "costel@gmail.com",
                    "phone": "0232272892"
                })

                let createUser = newUser.save((err, user) => {
                    if (err) console.log(err);
                    const newDaysOff1 = new DaysOff({
                        "userId": user._id,
                        "daysOff": ["2018-06-18", "2018-06-19", "2018-06-20"]
                    })
                    newDaysOff1.save((err, data) => {
                        if (err) console.log(err);
                    })
                    const newDaysOff2 = new DaysOff({
                        "userId": user._id,
                        "daysOff": ["2018-08-20", "2018-08-21", "2018-08-22"]
                    })

                    newDaysOff2.save((err, data) => {
                        if (err) console.log(err);
                    })
                })
                const newUser2 = new User({
                    "firstName": "Gigel",
                    "lastName": "Costache",
                    "email": "gigel@gmail.com",
                    "phone": "0232272892"
                })
                newUser2.save((err,user)=>{
                    if(err) console.log(err)
                    done();
                })
            });
        })
        it("Should return an array of booked days for an user", done => {
            let findUser = User.findOne({ email: "costel@gmail.com" })
                .then((user) => {
                    let userId = user["_id"];
                    getAlreadyBookedDays(userId)
                        .then((arrayOffBookedDays) => {
                            let alreadyBookedDays = [
                                "2018-06-18",
                                "2018-06-19", 
                                "2018-06-20", 
                                "2018-08-20", 
                                "2018-08-21", 
                                "2018-08-22"
                            ]
                            chai.expect(arrayOffBookedDays).to.deep.equal(alreadyBookedDays)
                            done();
                        })
                        .catch(err=>{console.log(err)})
                });
        })

       it("Should return an error for no booked days",done=>{
        let findUser = User.findOne({ email: "gigel@gmail.com" })
        .then((user) => {
            let userId = user["_id"];
            getAlreadyBookedDays(userId)
                .catch((err)=>{
                    let errorReturn ={
                        status: 404,
                        message: "No days booked yet"
                    }
                    chai.expect(err).to.deep.equal(errorReturn)
                    done();
                })
        });
       })
    })

})