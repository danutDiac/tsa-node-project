// const chai = require("chai");
// const { readFile, writeFile, findItemById } = require("../src/helpers/helpers");

// describe("GetUsers module actions", (done) => {

//     before(function (done) {
//         const users = [
//             {
//                 "id": 0,
//                 "firstName": "",
//                 "lastName": "",
//                 "email": "",
//                 "phone": ""
//             }
//         ]
        
//         writeFile("db/users.json", JSON.stringify(users))
//         .then(() => {
//             done();
//         })
//     })

//     it("Should return user with id 0", (done) => {
//         readFile("db/users.json")
//         .then(data => {
//             const users = JSON.parse(data);
//             const userId = 0;
//             const input = findItemById(users, userId);
//             const result = users[0];
            
//             chai.expect(input).to.deep.equal(result);
//             done();
//         })
//     });

//     it("Should return user with id -1", (done) => {
//         readFile("db/users.json")
//         .then(data => {
//             const users = JSON.parse(data);
//             const userId = -1;
//             const input = findItemById(users, userId);
//             const result = undefined;

//             chai.expect(input).to.deep.equal(result);
//             done();
//         })
//     });

//     it("Should return user with id 'A' ", (done) => {
//         readFile("db/users.json")
//         .then(data => {
//             const users = JSON.parse(data);
//             const userId = 'A';
//             const input = findItemById(users, userId);
//             const result = undefined;

//             chai.expect(input).to.deep.equal(result);
//             done();
//         })
//     });

//     it("Should return user with id '0' ", (done) => {
//         readFile("db/users.json")
//         .then(data => {
//             const users = JSON.parse(data);
//             const userId = '0';
//             const input = findItemById(users, userId);
//             const result = undefined;

//             chai.expect(input).to.deep.equal(result);
//             done();
//         })
//     });
// });
