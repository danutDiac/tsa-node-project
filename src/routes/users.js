let router = require("express").Router();
let fs = require('fs')
let { deleteUser } = require('../actions/deleteUserActions')

router.delete('/:id', deleteUser)

module.exports = router;
