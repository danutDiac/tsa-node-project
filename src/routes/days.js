let router = require("express").Router();
let { deleteDaysOff } = require('../actions/deleteDaysOffActions')
let { retriveAlreadyBookedDays } = require('../actions/retriveAlreadyBookedDaysActions')

router.delete('/:id', deleteDaysOff)
router.get('/:id', retriveAlreadyBookedDays)

module.exports = router;