const chai = require("chai");
const { readFile, writeFile, findItemById, getJSONFromFile } = require("../src/helpers/helpers");

describe("GetUsers module actions", done => {
    before(done => {
        const users = [
            {
                id: 0,
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            }
        ]
        
        writeFile("db/users.json", JSON.stringify(users))
        .then(() => {
            done();
        })
    })

    it("Should return user with id 0", (done) => {
        readFile("db/users.json")
        .then(data => {
            const users = JSON.parse(data);
            const userId = 0;
            const foundUser = findItemById(users, userId);
            const testUser = users[0];
            
            chai.expect(foundUser).to.deep.equal(testUser);
            done();
        });
    });

    it("Should return user with id -1", (done) => {
        readFile("db/users.json")
        .then(data => {
            const users = JSON.parse(data);
            const userId = -1;
            const foundUser = findItemById(users, userId);
            const testUser = undefined;

            chai.expect(foundUser).to.deep.equal(testUser);
            done();
        })
    });

    it("Should return user with id 'A' ", (done) => {
        readFile("db/users.json")
        .then(data => {
            const users = JSON.parse(data);
            const userId = 'A';
            const foundUser = findItemById(users, userId);
            const testUser = undefined;

            chai.expect(foundUser).to.deep.equal(testUser);
            done();
        })
    });

    it("Should return user with id '0' ", (done) => {
        readFile("db/users.json")
        .then(data => {
            const users = JSON.parse(data);
            const userId = '0';
            const foundUser = findItemById(users, userId);
            const testUser = undefined;

            chai.expect(foundUser).to.deep.equal(testUser);
            done();
        })
    });
});
