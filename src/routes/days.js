let { bookDaysOff } = require("../actions/bookingDays");
let router = require("express").Router();

router.post("/", bookDaysOff);

module.exports = router;