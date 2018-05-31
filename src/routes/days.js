let router = require("express").Router();
let { bookDaysOff } = require("../actions/bookingDaysOffActions");
let { deleteDaysOff } = require('../actions/deleteDaysOffActions')

router.post("/", bookDaysOff);
router.delete('/:id', deleteDaysOff)

module.exports = router;