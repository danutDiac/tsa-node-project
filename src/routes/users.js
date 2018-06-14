let router = require("express").Router();
let fs = require('fs')
let { getUser } = require("../actions/getUsersActions");
let { createUser } = require("../actions/createUserActions");
let { deleteUser } = require('../actions/deleteUserActions')
let { editUserPut, editUserPatch } = require("../actions/editUserActions")
let { retrieveUsers } = require('../actions/retrieveUsersActions');
let { getNumberOfDaysOff } = require('../actions/getNumberOfDaysOffActions')

router.post("/", createUser);
router.get("/:id", getUser);
router.get("/",retrieveUsers);
router.delete('/:id', deleteUser)
router.patch("/:id", editUserPatch)
router.put("/:id", editUserPut)
router.get('/getNumberOfDaysOff/:id', getNumberOfDaysOff)

module.exports = router;