const { readFile, writeFile, findItemById } = require("../src/helpers/helpers");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../src/main.js");
chai.use(chaiHttp);

describe("GetUser module routes", () => {
  beforeEach(function(done) {
    const users = [
      {
        id: 0,
        firstName: "Lenuta",
        lastName: "Udrea",
        email: "elena@udrea.com",
        phone: "089898989"
      },
      {
        id: 1,
        firstName: "Traian",
        lastName: "Basescu",
        email: "traian@president.ro",
        phone: "07834243"
      }
    ];

    after((done) => {
      const users = [
          {
              id: 0,
              firstName: "",
              lastName: "",
              email: "",
              phone: ""
          }
      ];

      writeFile("db/users.json", JSON.stringify(users)).then(() => {
          done();
      });
  });

    writeFile("db/users.json", JSON.stringify(users)).then(() => {
      done();
    });
  });
  it("Should return the list of users", done => {
    const input = `/users/`;
    readFile("db/users.json").then(data => {
      chai
        .request(server)
        .get(input)
        .end((error, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.deep.equal(JSON.parse(data));
          done();
        });
    });
  });

  it("Should have propriety email", done => {
    const input = `/users/`;
    chai
      .request(server)
      .get(input)
      .end((error, res) => {
        res.should.have.status(200);
        res.body[0].should.have.property("email");
        res.body[0].email.should.equal("elena@udrea.com");
        done();
      });
  });
});

