let { createUser } = require("../actions/createUser");
let { getUser } = require("../actions/getUsers");
let { editUserPut, editUserPatch } = require("../actions/editUser")

let router = require("express").Router();
let fs = require('fs')
let { deleteUser } = require('../actions/deleteUserActions')

router.post("/", createUser);
router.get("/:id", getUser);
router.delete('/:id', deleteUser)
router.patch("/:id", editUserPatch)
router.put("/:id", editUserPut)

module.exports = router;
