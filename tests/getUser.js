const chai = require('chai');
const chaiHttp = require('chai-http')
const should = chai.should();
chai.use(chaiHttp);

describe('GetUser Module', () => {

    it("Should return user with id 0", (done) => {
        const input = `/users/0`;
        const result = require("../db/users.json")[0];

        chai.request(`http://localhost:3000`)
            .get(input)
            .end((error, response) => {
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.deep.equal(result);
                done();
            })
    });

    it("Should return error 404 for id -1", (done) => {
        const input = `/users/-1`;
        const result = { "error": "User not found" };

        chai.request(`http://localhost:3000`)
            .get(input)
            .end((error, response) => {
                response.should.have.status(404);
                response.should.be.json;
                response.body.should.deep.equal(result);
                done();
            })
    });

    it("Should return error 404 for id 'A'", (done) => {
        const input = `/users/A`;
        const result = { "error": "User not found" };

        chai.request(`http://localhost:3000`)
            .get(input)
            .end((error, response) => {
                response.should.have.status(404);
                response.should.be.json;
                response.body.should.deep.equal(result);
                done();
            })
    });

    it("Should return error 404 for id '0'", (done) => {
        const input = `/users/"0"`;
        const result = { "error": "User not found" };

        chai.request(`http://localhost:3000`)
            .get(input)
            .end((error, response) => {
                response.should.have.status(404);
                response.should.be.json;
                response.body.should.deep.equal(result);
                done();
            })
    });
    
})

