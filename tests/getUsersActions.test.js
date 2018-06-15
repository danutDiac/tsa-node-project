const chai = require('chai')
const mongoose = require('mongoose')
const config = require('../config/config')
const {
    readFile,
    writeFile,
    findItemById,
    getJSONFromFile,
} = require('../src/helpers/helpers')

const User = require('../src/models/userModel')
const {
    getUserFromDB
} = require('../src/actions/getUsersActions')
describe('GetUsers module actions', done => {
    before(done => {
        mongoose.connect(config.mongoUrl).then(() => {
            mongoose.connection.db.dropDatabase()
            const newUser = new User({
                firstName: 'Gigel',
                lastName: 'Costache',
                email: 'costel@gmail.com',
                phone: '0232272892',
            })

            newUser.save((err, data) => {
                done();
            })
        })
    })

    it('Should return corect user from database', done => {
        let findUser = User.findOne({
            email: 'costel@gmail.com'
        }).then(
            user => {
                let userId = user['_id']
                getUserFromDB(userId).then(userData => {
                    chai.expect(userData).to.deep.equal(user)
                    done()
                })
            },
        )
    })

    it('Should return error for incorect user id', done => {
        let errorForUserNotFound = {
            status: 400,
            message: 'Bad user id',
        }
        getUserFromDB('231').catch(err => {
            chai.expect(err).to.deep.equal(errorForUserNotFound)
            done()
        })
    })

    it('Should return error for incorect user id', done => {
        let errorForUserNotFound = {
            status: 404,
            message: 'User not found',
        }
        getUserFromDB('321323xnsjsw').catch(err => {
            chai.expect(err).to.deep.equal(errorForUserNotFound)
            done()
        })
    })
})