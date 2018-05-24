var example = require("../db/users.json")[0];
var errorMessage = {
    "error": "User not found"
}

const chai = require('chai');
const chaiHttp = require('chai-http')
const should = chai.should();
chai.use(chaiHttp);

describe('GetUser Module', () => {
    it("Should return user with id 0", (done) => {
        chai.request(`http://localhost:3000`)
            .get('/users/0')
            .end((error, response) => {
                response.should.have.status(200);
                response.should.be.json;
                chai.expect(response.body).to.deep.equal(example);
                done();
            })
    });

    it("Should return error 404 for id -1", (done) => {
        chai.request(`http://localhost:3000`)
            .get('/users/-1')
            .end((error, response) => {
                response.should.have.status(404);
                response.should.be.json;
                chai.expect(response.body).to.deep.equal(errorMessage);
                done();
            })
    });

    it("Should return error 404 for id 'A'", (done) => {
        chai.request(`http://localhost:3000`)
            .get('/users/A')
            .end((error, response) => {
                response.should.have.status(404);
                response.should.be.json;
                chai.expect(response.body).to.deep.equal(errorMessage);
                done();
            })
    });

    it("Should return error 404 for id '0'", (done) => {
        chai.request(`http://localhost:3000`)
            .get('/users/"0"')
            .end((error, response) => {
                response.should.have.status(404);
                response.should.be.json;
                chai.expect(response.body).to.deep.equal(errorMessage);
                done();
            })
    });
})

