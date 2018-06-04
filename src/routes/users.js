let router = require("express").Router();
let fs = require('fs')
let { getUser } = require("../actions/getUsersActions");
let { createUser } = require("../actions/createUserActions");
let { deleteUser } = require('../actions/deleteUserActions');
let { retrieveUsers } = require('../actions/retrieveUsersActions');

router.post("/", createUser);
router.get("/:id", getUser);
router.get("/",retrieveUsers);
router.delete('/:id', deleteUser)

module.exports = router;