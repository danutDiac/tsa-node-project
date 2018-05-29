let { createUser } = require("../actions/createUser");
let { getUser } = require("../actions/getUsers");

let router = require("express").Router();

router.post("/", createUser);

module.exports = router;
