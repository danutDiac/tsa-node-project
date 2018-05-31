let router = require("express").Router();
let fs = require('fs')
let { getUser } = require("../actions/getUsersActions");
let { createUser } = require("../actions/createUserActions");
let { deleteUser } = require('../actions/deleteUserActions')

router.post("/", createUser);
router.get("/:id", getUser);
router.delete('/:id', deleteUser)

module.exports = router;
