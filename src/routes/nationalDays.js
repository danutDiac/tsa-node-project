let router = require("express").Router();
let { getNationalDays } = require('../actions/getNationalDaysActions')

router.get('/', getNationalDays)

module.exports = router;