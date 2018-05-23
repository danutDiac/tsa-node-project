let router = require("express").Router();

router.get("/", (request, response) => {
    response.end("Welcome to the coolest API in the world!");
});

module.exports = router;