let {createUser} = require("../actions/createUser");
let {retrieveUsers} = require("../actions/retrieveUsers");
let router = require("express").Router();

router.get('/:interval', retrieveUsers);
router.post("/", createUser);

module.exports = router;