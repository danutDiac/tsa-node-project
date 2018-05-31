const chai = require('chai')
const { readFile, findItemById } = require('../src/helpers/helpers')
const { deleteUserFromDatabase } = require('../src/actions/deleteUserActions')
const should = chai.should()

describe('DELETE /users/:id actions', function () {
    describe('findUser action', function () {
        it('should return user with id 0', function (done) {
            readFile("db/users.json")
            .then(data => {
                const users = JSON.parse(data);
                const userId = 0
                const user = findItemById(users, userId)
                const result = users[0]

                chai.expect(user).to.equal(result)
                done()
            })
        })
        it('should return undefined with id -1', function (done) {
            readFile("db/users.json")
            .then(data => {
                const users = JSON.parse(data);
                const userId = -1
                const user = findItemById(users, userId)
                const result = undefined
                
                chai.expect(user).to.equal(result)
                done()
            })
        })
        it("should return undefined with invalid id", function (done) {
            readFile("db/users.json")
            .then(data => {
                const users = JSON.parse(data);
                const userId = 'A'
                const user = findItemById(users, userId)
                const result = undefined
                
                chai.expect(user).to.equal(result)
                done()
            })
        })
    })
    describe('deleteUserFromDatabase action', function () {
        it('should remove given user from the array', function (done) {
            readFile("db/users.json")
            .then(data => {
                const users = JSON.parse(data);
                const usersArray = users.slice()
                const user = users[0]
                deleteUserFromDatabase(usersArray, user)

                usersArray.length.should.equal(users.length - 1)
                done()
            })
        })
        it('should do nothing on invalid user', function (done) {
            readFile("db/users.json")
            .then(data => {
                const users = JSON.parse(data);
                const usersArray = users.slice()
                const user = 5
                deleteUserFromDatabase(usersArray, user)

                usersArray.length.should.equal(users.length)
                done()
            })
        })
    })
})