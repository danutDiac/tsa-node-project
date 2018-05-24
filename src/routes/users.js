let { getUser } = require("../actions/userActions");
let router = require("express").Router();

router.get("/:id", getUser);

module.exports = router;