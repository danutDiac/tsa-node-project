var example = require("../db/users.json")[0];

const chai = require('chai');
const should = chai.should();
const { findUser } = require('../src/actions/userActions');
const users = require('../db/users.json')

describe('GetUser Module', () => {
    it("Should return user with id 0", () => {
        chai.expect(findUser(users, 0)).to.deep.equal(example);
    })

    it("Should return user with id -1", () => {
        chai.expect(findUser(users, -1)).to.deep.equal(false);
    })

    it("Should return user with id 'A' ", () => {
        chai.expect(findUser(users, 'A')).to.deep.equal(false);
    })

    it("Should return user with id '0' ", () => {
        chai.expect(findUser(users, '0')).to.deep.equal(false);
    })
    

})