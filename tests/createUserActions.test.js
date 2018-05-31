const chai = require("chai");
let { maxId } = require("../src/helpers/helpers");
let { dataValid, checkMail } = require("../src/actions/createUserActions");
const should = chai.should();
// console.log(users);

describe("Create user module actions", () => {
  const userBody = [
    {
      firstName: "Costel",
      lastName: "Ciobanu",
      email: "cevacenueste@mail.com",
      phone: "0734454922",
      id: 0
    },
    {
      firstName: "Costel",
      lastName: "Ciobanu",
      email: "cevamail.com",
      phone: "0734454922",
      id: 1
    },
    {
      firstName: "Costel",
      lastName: "Ciobanu",
      email: "ceva@mail.com",
      phone: "0734454922",
      id: 2
    },
    {
      firstName: "Co2tel",
      lastName: "Ciobanu",
      email: "cevacareecutotulaltceva@mail.com",
      phone: "0734454922",
      id: 3
    }
  ];
  const users = [
    {
      firstName: "Costel",
      lastName: "Ciobanu",
      email: "cidsadagmail.com",
      phone: "0734454922",
      id: 1
    },
    {
      firstName: "Co5t3!",
      lastName: "Ciobanu",
      email: "cidsa@dagmail.com",
      phone: "0734454922",
      id: 2
    },
    {
      firstName: "Costel",
      lastName: "Ciobanu",
      email: "ceva@mail.com",
      phone: "0734454922",
      id: 3
    },
    {
      firstName: "Costel",
      lastName: "Ciobanu",
      email: "altceva@gmail.com",
      phone: "0734454922",
      id: 4
    },
    {
      firstName: "Costel",
      lastName: "Ciobanu",
      email: "altceva@gmail.com",
      phone: "0734454922",
      id: 5
    }
  ];
  describe("maxId", () => {
    it("Should return the maximum value for existing user id", done => {
      // console.log(users);
      let expectedResult = 5;
      let result = maxId(users);

      chai.expect(result).to.equal(expectedResult);
      done();
    });
  });

  describe("dataValid", () => {
    it("Should return 1 when the validation is good", done => {
      let result = dataValid(userBody[0], users);
      chai.expect(result).to.equal(1);
      done();
    });
    it("Should return the error when mail validation requirements are not met", done => {
      let result = dataValid(userBody[1], users);
      chai.expect(result).to.equal("Ati introdus emailul gresit" + "\n");
      done();
    });
    it("Should return an error when you add odd characters to the name", done => {
      let result = dataValid(userBody[3], users);
      chai.expect(result).to.equal("Ati introdus prenumele gresit" + "\n");
      done();
    });
  });
  describe("checkMail", () => {
    it("Should return 0 when there is the same e-mail twice", done => {
      let result = checkMail(userBody, users);
      chai.expect(result).to.equal(0);
      done();
    });
  });
});
