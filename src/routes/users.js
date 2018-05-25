let createUser = require("../actions/createUser");
let retrieveUser = require("../actions/retrieveUser")
let router = require("express").Router();

router.get("/");
router.post("/", createUser);

module.exports = router;