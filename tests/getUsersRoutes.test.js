const chai = require('chai');
const chaiHttp = require('chai-http')
const should = chai.should();
const server = require("../src/main.js");
chai.use(chaiHttp);

const User = require("../src/models/userModel");

describe('GetUser module routes', () => {
    it("Should return corect user from database", (done) => {

        let findUser = User.findOne({ email: "costel@gmail.com" }).exec()
            .then((user) => {
                let userId = user["_id"];
                let userFromDB = JSON.parse(JSON.stringify(user));
                const link = `/users/${userId}`;
                chai.request(server)
                    .get(link)
                    .end((error, response) => {
                        response.should.have.status(200);
                        response.should.be.json;
                        chai.expect(response.body.user).to.deep.equal(userFromDB);
                        done();
                    })
            })
    });

    it("Should return error 404 for inexistent id", (done) => {
        const link = `/users/123456789abv`;
        const errorMessage = {
            error: "User not found"
        }
        chai.request(server)
            .get(link)
            .end((error, response) => {
                response.should.have.status(404);
                response.should.be.json;
                chai.expect(response.body).to.deep.equal(errorMessage);
                done();
            })
    });

    it("Should return error 400 for an wrong link", (done) => {
        const link = `/users/123456789ab`;
        const errorMessage = {
            error: "Bad user id"
        }
        chai.request(server)
            .get(link)
            .end((error, response) => {
                response.should.have.status(400);
                response.should.be.json;
                chai.expect(response.body).to.deep.equal(errorMessage);
                done();
            })
    });

})