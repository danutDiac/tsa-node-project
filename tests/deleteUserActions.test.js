const chai = require('chai')
const { findUser, deleteUserFromDatabase } = require('../src/actions/deleteUserActions')
const should = chai.should()
const users = require('../db/users.json')

describe('DELETE /users/:id actions', function () {
    describe('findUser action', function () {
        it('should return user with id 0', function () {
            const userId = 0
            const user = findUser(users, userId)
            const result = users[0]
            user.should.equal(result)
        })
        it('should return undefined with id -1', function () {
            const userId = -1
            const user = findUser(users, userId)
            const result = undefined
            chai.expect(user).to.equal(result)
        })
        it("should return undefined with invalid id", function () {
            const userId = 'A'
            const user = findUser(users, userId)
            const result = undefined
            chai.expect(user).to.equal(result)
        })
    })
    describe('deleteUserFromDatabase action', function () {
        it('should remove given user from the array', function () {
            const usersArray = users.slice()
            const user = users[0]
            deleteUserFromDatabase(usersArray, user)
            usersArray.length.should.equal(users.length - 1)
        })
        it('should do nothing on invalid user', function () {
            const usersArray = users.slice()
            const user = 5
            deleteUserFromDatabase(usersArray, user)
            usersArray.length.should.equal(users.length)
        })
    })
})