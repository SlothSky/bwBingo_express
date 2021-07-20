var express = require('express')

var router = express.Router()
var buzzWord = require('./api/buzzWord.route')


router.use('/buzzWord', buzzWord);


module.exports = router;