let router = require("express").Router();
let { deleteDaysOff } = require('../actions/deleteDaysOffActions')
let { getDaysOff } = require('../actions/getNumberOfDaysOffActions')
let { retriveAlreadyBookedDays } = require('../actions/retriveAlreadyBookedDaysActions')

router.delete('/:id', deleteDaysOff)
router.get('/:id', getDaysOff)

module.exports = router;