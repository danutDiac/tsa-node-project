const chai = require('chai')
const { getJSONFromFile } = require('../src/helpers/helpers')

describe('Booking days module', () => {
    describe('is date valid ', () => {
        it('Should say that date "2018-01-20" is valid', done => {
            const {
                isDateValid,
            } = require('../src/actions/bookingDaysOffActions')
            const date = '2018-01-20'
            const input = isDateValid(date)
            const result = true

            chai.expect(input).to.deep.equal(result)
            done()
        })

        it('Should say that date "A" is invalid', done => {
            const {
                isDateValid,
            } = require('../src/actions/bookingDaysOffActions')
            const date = 'A'
            const input = isDateValid(date)
            const result = false

            chai.expect(input).to.deep.equal(result)
            done()
        })

        it('Should say that date "2018-00-50" is invalid', done => {
            const {
                isDateValid,
            } = require('../src/actions/bookingDaysOffActions')
            const date = '2018-00-50'
            const input = isDateValid(date)
            const result = false

            chai.expect(input).to.deep.equal(result)
            done()
        })

        it('Should say that date "undefined" is invalid', done => {
            const {
                isDateValid,
            } = require('../src/actions/bookingDaysOffActions')
            const date = undefined
            const input = isDateValid(date)
            const result = false

            chai.expect(input).to.deep.equal(result)
            done()
        })
    })

    describe('check is date interval ok', () => {
        it('should pass if the date is valid', done => {
            const {
                isDateIntervalOk,
            } = require('../src/actions/bookingDaysOffActions')
            const input = '2018-08-23'
            const dateName = 'Date'
            const result = ''
            chai.expect(isDateIntervalOk(input, dateName)).to.equal(result)
            done()
        })
        it('should fail if the date is set in the past', done => {
            const {
                isDateIntervalOk,
            } = require('../src/actions/bookingDaysOffActions')
            const input = '2016-06-23'
            const dateName = 'Date'
            const result = 'Date should not be lower than today\n'
            chai.expect(isDateIntervalOk(input, dateName)).to.equal(result)
            done()
        })
        it('should fail if the year is 4 years in the future', done => {
            const {
                isDateIntervalOk,
            } = require('../src/actions/bookingDaysOffActions')
            const input = '2022-06-23'
            const dateName = 'Date'
            const result = 'Date year should not be set 3 years in the future\n'
            chai.expect(isDateIntervalOk(input, dateName)).to.equal(result)
            done()
        })
    })
    describe('validate body', () => {
        it('should fail if user id is not a number', done => {
            const {
                validateBody,
            } = require('../src/actions/bookingDaysOffActions')
            const input = {
                userId: 'a',
                startDate: '2018-07-24',
                endDate: '2018-08-05',
            }
            const result = 'User id is not a number\n'

            validateBody(input).catch(output => {
                chai.expect(output['message']).to.equal(result)
                done()
            })
        })

        it('should fail if all inputs are invalid', done => {
            const {
                validateBody,
            } = require('../src/actions/bookingDaysOffActions')
            const input = {
                userId: 'a',
                startDate: 'b',
                endDate: 'c',
            }
            const result =
                'User id is not a number\n' +
                'Start date is invalid\n' +
                'End date is invalid\n'

            validateBody(input).catch(output => {
                chai.expect(output['message']).to.equal(result)
                done()
            })
        })
        it('should pass if all inputs are valid', done => {
            const {
                validateBody,
            } = require('../src/actions/bookingDaysOffActions')
            const input = {
                userId: 1,
                startDate: '2018-06-24',
                endDate: '2018-07-23',
            }
            validateBody(input).then(() => {
                done()
            })
        })
    })
    describe('validate user exists', () => {
        it('should pass if the user exists', done => {
            const {
                validateUserExists,
            } = require('../src/actions/bookingDaysOffActions')
            const input = {
                userId: 0,
            }

            getJSONFromFile('db/users.json').then(users => {
                validateUserExists(input, users).then(() => done())
            })
        })
        it('should fail if the user is not found', done => {
            const result = {
                status: 404,
                message: 'User not found',
            }
            const {
                validateUserExists,
            } = require('../src/actions/bookingDaysOffActions')
            const input = {
                userId: 8,
            }

            getJSONFromFile('db/users.json').then(users => {
                validateUserExists(input, users).catch(err => {
                    console.log(err)
                    chai.expect(err['status']).to.deep.equal(result['status'])
                    chai.expect(err['message']).to.deep.equal(result['message'])
                    done()
                })
            })
        })
    })
    describe('format date', done => {
        it('should format date corect', done => {
            const {
                formatDate,
            } = require('../src/actions/bookingDaysOffActions')
            const input = 9
            const result = '09'
            chai.expect(formatDate(input)).to.equal(result)
            done()
        })
    })

    describe('Create days off array', () => {
        it('Should log days correctly for startdate = 2018-10-20 and enddate = 2018-10-30', done => {
            const {
                daysOffRangeToArray,
            } = require('../src/actions/bookingDaysOffActions')
            const startDate = '2018-10-20'
            const endDate = '2018-10-30'
            daysOffRangeToArray(startDate, endDate).then(input => {
                const result = [
                    '2018-10-22',
                    '2018-10-23',
                    '2018-10-24',
                    '2018-10-25',
                    '2018-10-26',
                    '2018-10-29',
                    '2018-10-30',
                ]

                chai.expect(input).to.deep.equal(result)
                done()
            })
        })

        it('Should log days correctly for startdate = 2018-10-20 and enddate = 2018-11-04', done => {
            const {
                daysOffRangeToArray,
            } = require('../src/actions/bookingDaysOffActions')
            const startDate = '2018-10-20'
            const endDate = '2018-11-04'
            daysOffRangeToArray(startDate, endDate)
                .then(input => {
                    const result = [
                        '2018-10-22',
                        '2018-10-23',
                        '2018-10-24',
                        '2018-10-25',
                        '2018-10-26',
                        '2018-10-29',
                        '2018-10-30',
                        '2018-10-31',
                        '2018-11-01',
                        '2018-11-02',
                    ]

                    chai.expect(input).to.deep.equal(result)
                    done()
                })
                .catch(error => {
                    console.log(error)
                })
        })

        it('Should return [] for startdate = 2018-10-20 and enddate = 2018-10-10', done => {
            const {
                daysOffRangeToArray,
            } = require('../src/actions/bookingDaysOffActions')
            const startDate = '2018-10-20'
            const endDate = '2018-10-10'
            daysOffRangeToArray(startDate, endDate).catch(error => {
                chai
                    .expect(error.message)
                    .to.deep.equal('End date lower than start date')
                done()
            })
        })
    })
    describe('create new days off json', () => {
        let daysOff = []

        it('should create a propper json', done => {
            const {
                createNewDaysOffJSON,
            } = require('../src/actions/bookingDaysOffActions')
            const daysOffArray = ['2018-05-04', '2018-05-05', '2018-05-06']
            const id = 0
            const result = {
                id: 0,
                userId: id,
                daysOff: daysOffArray,
            }
            createNewDaysOffJSON(daysOff, id, daysOffArray).then(output => {
                chai.expect(output).to.deep.equal(result)
                done()
            })
        })
    })
})
