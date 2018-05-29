let { createUser } = require("../actions/createUser");
let router = require("express").Router();

router.post("/", createUser);

module.exports = router;
