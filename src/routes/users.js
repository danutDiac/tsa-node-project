let { createUser } = require("../actions/createUser");
let { getUser } = require("../actions/getUsers");

let router = require("express").Router();

router.post("/", createUser);
router.get("/:id",getUser);

module.exports = router;
