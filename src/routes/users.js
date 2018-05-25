let router = require("express").Router();
let fs = require('fs')
let {deleteUser} = require('../actions/userActions')

router.delete('/:id', deleteUser)

module.exports = router;
