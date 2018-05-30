let idMax = require("../src/actions/createUser").idMax;
let dataValid = require("../src/actions/createUser").dataValid;
let checkMail = require("../src/actions/createUser").checkMail;

let users = [
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
    email: "altceva@gmail.com",
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

const chai = require("chai");
const should = chai.should();


describe("idMax", () => {
  it("Should return the maximum value for existing user id", done => {
    let expectedResult = 5;
    let result = idMax(users);

    chai.expect(result).to.equal(expectedResult);
    done()
  });
});

describe('dataValid', ()=>{
  it("Should return 1 when the validation is good", done => {
    let result = dataValid(users[2]);
    chai.expect(result).to.equal(1);
    done()
  })
  it("Should return the error when mail validation requirements are not met", done => {
    let result = dataValid(users[0]);
    chai.expect(result).to.equal("Ati introdus emailul gresit" + "\n");
    done();
  })
  it("Should return error when you add odd characters to the name", done =>{
    let result  = dataValid(users[1]);
    chai.expect(result).to.equal("Ati introdus prenumele gresit" + "\n");
    done();
  })
})
describe('checkMail',()=>{
  it("Should return 0 when there is the same e-mail twice", done =>{
    let result  = checkMail(users[3],users);
    chai.expect(result).to.equal(0);
    done();
  })
})


