var axios = require("axios");
const { expect } = require("chai");

let getUser = (id) => {
    return axios
        .get(`http://localhost:3000/users/${id}`)
        .then(res => res.data)
        .catch(error => console.log(error));
}

var example = require("../db/users.json")[0];
var throwError = {
    "error": "User not found"
}

describe("GetUser Module", () => {
    it("Should return user with id 0", () => {
        return getUser(0)
            .then(res => {
                expect(res).to.deep.equal(example)
            })
    });

})


