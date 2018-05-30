let router = require("express").Router();
let { deleteDaysOff } = require('../actions/deleteDaysOffActions')

router.delete('/:id', deleteDaysOff)

module.exports = router;