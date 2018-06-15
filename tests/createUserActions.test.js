const chai = require("chai");
const chaiHttp = require("chai-http");
const config = require("../config/config");
const mongoose = require("mongoose");
let User = require("../src/models/userModel");
let { dataValid, saveUserToDb } = require("../src/actions/createUserActions");
const should = chai.should();

const server = require("../src/main.js");
// user1 is control user
let user1 = {
  "firstName" : "Ivanka",
  "lastName": "Trump",
  "email": "suaforlife@foreal.us",
  "phone": "0999999999"
};
// user2 has the same email as our model in DB
let user2 = {
  "firstName": "Ivanka",
  "lastName": "Trump",
  "email": "tzaruparu@petersburg.ru",
  "phone": "0999999999"
};
// user3 has wrong data 
let user3 = {
  "firstName": "Iv4nk4",
  "lastName": "Trump",
  "email": "tzaruparupetersburg.ru",
  "phone": "0999999999"
};
describe("POST / CREATE USER ", () => {
  beforeEach(done => {
    mongoose.connection.db.dropDatabase();
    let newUser = new User({
      firstName: "Ivan",
      lastName: "CelGroaznic",
      email: "tzaruparu@petersburg.ru",
      phone: "0777777777"
    });
    newUser.save();
    done();
  });

  describe("dataValid", () => {
    it("Should return status 200 when valid data is sent to the server", done => {
      chai
        .request(server)
        .post("/users/")
        .send(user1)
        .then((err, res) => {
          res.should.have.status(200);
        })
        .catch(err => err);
      done();
    });
    it("Should return status 400 when a user tries to register with an already used email address", done => {
      chai
        .request(server)
        .post("/users/")
        .send(user2)
        .then((err, res) => {
          res.should.have.status(400);
        })
        .catch(err => err);
      done();
    });
    it("Should return an error when wrong characters are being used to fill the form", done => {
      chai
        .request(server)
        .post("/users/")
        .send(user3)
        .then((err, res) => {
          res.should.have.status(400);
        })
        .catch(err => err);
      done();
    });
  });
});
