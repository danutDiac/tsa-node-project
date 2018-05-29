let { getUser } = require("../actions/getUsers");
let router = require("express").Router();

router.get("/:id", getUser);

module.exports = router;