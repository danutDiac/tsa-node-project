let router = require("express").Router();
let fs = require('fs')
let { getUser } = require("../actions/getUsers");
let { deleteUser } = require('../actions/deleteUserActions')

router.get("/:id", getUser);
router.delete('/:id', deleteUser)

module.exports = router;
