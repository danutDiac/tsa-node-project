let chai = require('chai');
let mocha = require('mocha');
let should = chai.should();
let { readFile, writeFile, findItemById } = require('../src/helpers/helpers');
let { deleteDaysOffFromArray } = require('../src/actions/deleteDaysOffActions');

describe('Delete days off actions', () => {
    describe('findDaysOff action', () => {
        it('Should return days off with id 0', (done) => {
            readFile('db/daysOff.json')
            .then(data => {
                const daysOff = JSON.parse(data);
                let dayOff = findItemById(daysOff, 0);

                chai.expect(dayOff).to.deep.equal(daysOff[0]);
                done();
            })
        })
        it('Should return undefined with id -1', (done) => {
            readFile('db/daysOff.json')
            .then(data => {
                const daysOff = JSON.parse(data);
                let dayOff = findItemById(daysOff, -1);

                chai.expect(dayOff).to.deep.equal(undefined);
                done();
            })
        })
        it("Should return undefined for invalid id", (done) => {
            readFile('db/daysOff.json')
            .then(data => {
                const daysOff = JSON.parse(data);
                let dayOff = findItemById(daysOff, 'A');
                
                chai.expect(dayOff).to.deep.equal(undefined);
                done();
            })
        })
    })
    describe('deleteDaysOffFromArray action', () => {
        it('Should delete day from array for existing day', (done) => {
            readFile('db/daysOff.json')
            .then(data => {
                const daysOff = JSON.parse(data);
                let daysOffArray = daysOff.slice();
                let index = 0;
                
                deleteDaysOffFromArray(daysOffArray, index);
                daysOffArray.length.should.equal(daysOff.length - 1);
                done();
            })
        })
        it('should not delete day from array for unexisting day', () => {
            readFile('db/daysOff.json')
            .then(data => {
                const daysOff = JSON.parse(data);
                let daysOffArray = daysOff.slice();
                let index = 5;
                
                deleteDaysOffFromArray(daysOffArray, index);
                daysOffArray.length.should.equal(daysOff.length);
                done();
            })
        })
    })
})