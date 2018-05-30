let { createUser } = require("../actions/createUser");
let { getUser } = require("../actions/getUsers");

let router = require("express").Router();
let fs = require('fs')
let { deleteUser } = require('../actions/deleteUserActions')

router.post("/", createUser);
router.get("/:id", getUser);
router.delete('/:id', deleteUser)

module.exports = router;
