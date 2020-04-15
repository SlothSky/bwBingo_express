var express = require('express')

var router = express.Router()
var question = require('./api/template.route')


router.use('/quiz', question);


module.exports = router;