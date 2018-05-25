const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')
const server = require('../src/main')
const should = chai.should()
chai.use(chaiHttp)

describe('DELETE /users/:id', function () {
    afterEach(function (done) {
        const users = [
            {
                "id": 0,
                "firstName": "",
                "lastName": "",
                "email": "",
                "phone": ""
            }
        ]
        fs.writeFile('db/users.json', JSON.stringify(users), function (err) {
            if(err) console.log(err)
            done()
        })
    })
    it('should return status 404 for id not found', function (done) {
        chai.request(server).delete('/users/-1')
            .end(function (err, res) {
                res.should.have.status(404)
                res.should.be.json
                res.body.message.should.equal('User not found')
                done()
            })
    })
    it('should return status 404 for invalid id', function (done) {
        chai.request(server).delete('/users/A')
            .end(function (err, res) {
                res.should.have.status(404)
                res.should.be.json
                res.body.message.should.equal('User not found')
                done()
            })
    })
    it('should return status 200 for id found', function (done) {
        chai.request(server).delete('/users/0')
            .end(function (err, res) {
                res.should.have.status(200)
                res.should.be.json
                res.body.message.should.equal('User deleted')
                done()
            })
    })
})