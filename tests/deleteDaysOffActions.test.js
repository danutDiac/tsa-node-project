let chai = require('chai');
let mocha = require('mocha');
let should = chai.should();
let daysOff = require('../db/daysOff.json')
let { findDaysOff, deleteDaysOffFromArray } = require('../src/actions/deleteDaysOffActions');

describe('Delete days off actions', () => {
    describe('Find days off action', () => {
        it('Should return days off with id 0', () => {
            let dayOff = findDaysOff(0);
            dayOff.should.equal(daysOff[0]);
        })
        it('Should not return days off with id -1', () => {
            let dayOff = findDaysOff(-1);
            chai.expect(dayOff).to.equal(undefined);
        })
        it('Should not return days off with id A', () => {
            let dayOff = findDaysOff('A');
            chai.expect(dayOff).to.equal(undefined);
        })
    })
    describe('delete days off from array', () => {
        it('Should delete day from array', () => {
            let daysOffAray = daysOff.slice();
            let index = 0;
            deleteDaysOffFromArray(daysOffAray, index);
            daysOffAray.length.should.equal(daysOff.length - 1);
        })
        it('should not delete day from array', () => {
            let daysOffAray = daysOff.slice();
            let index = 5;
            deleteDaysOffFromArray(daysOffAray, index);
            daysOffAray.length.should.equal(daysOff.length);
        })
    })
})