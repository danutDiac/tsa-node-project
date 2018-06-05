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
        ];

        writeFile("db/users.json", JSON.stringify(users)).then(() => {
            done();
        });
    });

    describe("Parse JSON from file function", () => {
        before(function(done) {
            writeFile("db/users.json", "[").then(() => {
                done();
            });
        });

        after(function(done) {
            const users = [
                {
                    id: 0,
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: ""
                }
            ];

            writeFile("db/users.json", JSON.stringify(users)).then(() => {
                done();
            });
        });

        it("Should fail if JSON is invalid", done => {
            const {
                parseJSONFromFile
            } = require("../src/actions/getUsersActions");

            parseJSONFromFile("db/users.json").catch(() => done());
        });
    });

    describe("Find user by id", () => {
        it("Should return user with id 0", done => {
            readFile("db/users.json").then(data => {
                const users = JSON.parse(data);
                const userId = 0;
                const input = findItemById(users, userId);
                let result = users[0];

                chai.expect(input).to.deep.equal(result);
                done();
            });
        });

        it("Should return user with id -1", done => {
            readFile("db/users.json").then(data => {
                const users = JSON.parse(data);
                const userId = -1;
                const input = findItemById(users, userId);
                const result = undefined;

                chai.expect(input).to.deep.equal(result);
                done();
            });
        });

        it("Should return user with id 'A' ", done => {
            readFile("db/users.json").then(data => {
                const users = JSON.parse(data);
                const userId = "A";
                const input = findItemById(users, userId);
                const result = undefined;

                chai.expect(input).to.deep.equal(result);
                done();
            });
        });

        it("Should return user with id '0' ", done => {
            readFile("db/users.json").then(data => {
                const users = JSON.parse(data);
                const userId = "0";
                const input = findItemById(users, userId);
                const result = undefined;

                chai.expect(input).to.deep.equal(result);
                done();
            });
        });
    });

    describe("Get user from database", () => {
        it("Should retrieve user correctly if id is valid", done => {
            const { getUserFromDB } = require("../src/actions/getUsersActions");
    
            getJSONFromFile("db/users.json")
            .then(users => {
                const input = 0;
                const result = users[0];

                getUserFromDB(input, users)
                .then(user => {
                    chai.expect(user).to.deep.equal(result);
                    done();
                })
            });
        });

        it("Should fail with 404 if user is not found", done => {
            const { getUserFromDB } = require("../src/actions/getUsersActions");
    
            getJSONFromFile("db/users.json")
            .then(users => {
                const input = -1;
                
                getUserFromDB(input, users)
                .catch(error => {
                   chai.expect(error["status"]).to.equal(404);
                   chai.expect(error["message"]).to.equal("User not found");
                   done();
                });
            });
        });
    });
});
