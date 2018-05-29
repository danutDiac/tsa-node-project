let mocha = require("mocha");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
let server = require("../src/main.js");
let fs = require("fs");
chai.use(chaiHttp);

describe("DELETE /days/:id", () => {
    afterEach((done) => {
        let days = [
            {
                "id": 0,
                "userId": 0,
                "daysOff": ["2018-02-20", "2018-02-21"]
            }
        ];

        fs.writeFile('db/daysOff.json', JSON.stringify(days), (err) => {
            if (err) {
                console.log(err);
            }
            done();
        })
    })
    
    it("it should return 200 on delete", (done) => {
        chai.request(server).delete("/days/0")
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
        })
    })

    it("it should return 404 if not found", (done) => {
        chai.request(server).delete("/days/-1")
        .end((err, res) => {
            res.should.have.status(404);
            res.should.be.json;
            done();
        })
    })

    it("it should return 404 for invalid id", (done) => {
        chai.request(server).delete("/days/A")
        .end((err, res) => {
            res.should.have.status(404);
            res.should.be.json;
            done();
        })
    })
})