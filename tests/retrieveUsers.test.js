const chai = require('chai');
const chaiHttp = require('chai-http')
const should = chai.should();
const server = require("../src/main.js");
chai.use(chaiHttp);

describe('GetUser module routes', () => {

    it("Should return user with lastname Alighieri", (done) => {
        const input = `/users/retrieve/Alighieri`;
        const result = require("../db/users.json")[1];

        chai.request(server)
            .get(input)
            .end((error, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body[0].should.deep.equal(result);
                console.log(result);
                done();
            });
    });

    it("Should return error 404 for lastname written using minuscules", (done) => {
        const input = `/users/retrieve/alighieri`;
        const result = { "serverErrorMessage": "User not found" };

        chai.request(server)
            .get(input)
            .end((error, res) => {
                res.should.have.status(404);
                res.should.be.json;
                res.body.should.deep.equal(result);
                done();
            })
    });

    it("Should return error 404 for a lastname which is not in the DB", (done) => {
        const input = `/users/retrieve/notexist`;
        const result = { "serverErrorMessage": "User not found" };

        chai.request(server)
            .get(input)
            .end((error, res) => {
                res.should.have.status(404);
                res.should.be.json;
                res.body.should.deep.equal(result);
                done();
            })
    });

    it("Should return an array containing all the user details of people with the same lastname",(done)=>{
        const input  = '/users/retrieve/Alighieri';
        const result = [require("../db/users.json")[1],require("../db/users.json")[2]];
        chai.request(server)
            .get(input)
            .end((err,res)=>{
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.deep.equal(result);
                done();
            })
    })
    
})

