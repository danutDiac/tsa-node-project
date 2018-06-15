const chai = require("chai")
const mongoose = require("mongoose")
const config = require("../config/config")
const DaysOff = require("../src/models/daysOffModel");
const User = require("../src/models/userModel");
const { findBookedDays, createArrayOffBookedDaysOff, getAlreadyBookedDays } = require("../src/actions/retriveAlreadyBookedDaysActions")

const createItem = item => {
    return new Promise((resolve, reject) => {
        item.save((error, data) => {
            if (error) reject(error);
            else resolve(data);
        })
    })
}

describe("retriveAlreadyBookedDays module actions", (done) => {

    describe("findBookedDays function tests", done => {
        before((done) => {
            mongoose.connect(config.mongoUrl).then(() => {
                mongoose.connection.db.dropDatabase()
                const newUser = new User({
                    firstName: "Gigel",
                    lastName: "Costache",
                    email: "costel@gmail.com",
                    phone: "0232272892"
                });
    
                const newUser2 = new User({
                    firstName: "Gigel",
                    lastName: "Costache",
                    email: "gigel@gmail.com",
                    phone: "0232272892"
                });
    
                const firstUser = createItem(newUser)
                .then(user => {
                    return createItem(new DaysOff({
                        userId: user._id,
                        daysOff: ["2018-06-18", "2018-06-19", "2018-06-20"]
                    }))
                    .then(() => {
                        return createItem(new DaysOff({
                            userId: user._id,
                            daysOff: ["2018-08-20", "2018-08-21", "2018-08-22"]
                        }))
                    })
                });
    
                const secondUser = createItem(newUser2);
    
                Promise.all([firstUser, secondUser])
                .then(() => done());
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