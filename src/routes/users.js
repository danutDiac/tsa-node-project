let getUser = require("../actions/userActions");
let createUser = require("../actions/createUser");
let router = require("express").Router();


router.get("/:id", getUser);
router.post("/", createUser);

module.exports = router;