const chai = require('chai');

describe('GetUsers Module', () => {

    it("Should return user with id 0", () => {
        const { findUser } = require('../src/actions/getUsers');
        const users = require('../db/users.json');
        const userId = 0;
        const input = findUser(users, userId);
        const result = require("../db/users.json")[0];

        chai.expect(input).to.deep.equal(result);
    })

    it("Should return user with id -1", () => {
        const { findUser } = require('../src/actions/getUsers');
        const users = require('../db/users.json');
        const userId = -1;
        const input = findUser(users, userId);
        const result = false;

        chai.expect(input).to.deep.equal(result);
    })

    it("Should return user with id 'A' ", () => {
        const { findUser } = require('../src/actions/getUsers');
        const users = require('../db/users.json');
        const userId = 'A';
        const input = findUser(users, userId);
        const result = false;

        chai.expect(input).to.deep.equal(result);
    })

    it("Should return user with id '0' ", () => {
        const { findUser } = require('../src/actions/getUsers');
        const users = require('../db/users.json');
        const userId = `"0"`;
        const input = findUser(users, userId);
        const result = false;

        chai.expect(input).to.deep.equal(result);
    })

})