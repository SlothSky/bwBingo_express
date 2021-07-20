var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var BuzzWordController = require('../../controllers/buzzWord.controller');


// Map each API function to the Controller Functions

router.get('/', BuzzWordController.getBuzzWord)

router.post('/', BuzzWordController.createBuzzWord)

router.put('/', BuzzWordController.updateTemplate)

router.delete('/:id',BuzzWordController.removeBuzzWord)


// Export the Router

module.exports = router;