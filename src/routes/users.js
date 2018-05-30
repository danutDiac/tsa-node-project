let { createUser } = require("../actions/createUser");
let { getUser } = require("../actions/getUsers");
let {retrieveUsers} = require("../actions/retrieveUsers");
let { deleteUser } = require('../actions/deleteUserActions')

let router = require("express").Router();
let fs = require('fs')

router.post("/", createUser);
router.get("/:id", getUser);
router.get("/retrieve/:name",retrieveUsers);
router.delete('/:id', deleteUser)

module.exports = router;
