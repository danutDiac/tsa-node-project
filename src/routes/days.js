let router = require("express").Router();
let { bookDaysOff } = require("../actions/bookingDaysOffActions");
let { deleteDaysOff } = require('../actions/deleteDaysOffActions')
let { retriveAlreadyBookedDays } = require('../actions/retriveAlreadyBookedDaysActions')

router.post("/", bookDaysOff);
router.delete('/:id', deleteDaysOff)
router.get('/:id', retriveAlreadyBookedDays)

module.exports = router;