var example = require("../db/users.json")[1];
var errorMessage = {
    "error": "User could not be created"
}

const chai = require('chai');
const chaiHttp = require('chai-http')
const should = chai.should();
chai.use(chaiHttp);

describe('CreateUser Module', () => {
    it("Should check if user with id 1 was created", (done) => {
        chai.request(`http://localhost:3000`)
            .get('/users/1')
            .end((error, response) => {
                response.should.have.status(200);
                response.should.be.json;
                chai.expect(response.body).to.deep.equal(example);
                done();
            })
    });

    it("Should return error 400 if wrong data is introduced", (done) => {
        chai.request(`http://localhost:3000`)
            .get('/users/')
            .end((error, response) => {
                response.should.have.status(400);
                response.should.be.json;
                chai.expect(response.body).to.deep.equal(errorMessage);
                done();
            })
    });
        

})

