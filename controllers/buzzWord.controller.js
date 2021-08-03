// Accessing the Service that we just created

var BuzzWordService = require('../services/buzzWord.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getBuzzWord = async function(req, res)
{
    console.log(req.query);
    let query = req.query ? req.query : {};
    let page = req.query.page ? req.query.page : 1;
    let limit = req.query.limit ? req.query.limit : 50; 

    try
    {
        let buzzWords = await BuzzWordService.getBuzzWord(query, page, limit)

        // Return the todos list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({status: 200, data: buzzWords, message: "Succesfully Recieved BuzzWords"});
    }
    catch(e)
    {    
        //Return an Error Response Message with Code and the Error Message.      
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createBuzzWord = async function(req, res)
{
    // Req.Body contains the form submit values.
    let buzzWord = {
        name: req.body.name,
        description: req.body.description,
        mdbId: req.body.mdbId,
        sourcePath: req.body.sourcePath
    }

    try
    {
        // Calling the Service function with the new object from the Request Body
        let createdBuzzWord = await BuzzWordService.createBuzzWord(buzzWord)

        return res.status(201).json({status: 201, data: createdBuzzWord, message: "Succesfully created BuzzWord"})
    }
    catch(e)
    {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "BuzzWord creation was unsuccesful"})
    }
}

exports.updateTemplate = async function(req, res)
{
    if(!req.body._id)
    {
        return res.status(400).json({status: 400, message: "BuzzWord's ID is missing"})
    }

    let id = req.body._id;


    let buzzWord = {
        id,
        name: req.body.name ? req.body.name : null,
        description: req.body.description ? req.body.description : null,
        mdbId: req.body.mdbId ? req.body.mdbId : null,
        sourcePath: req.body.sourcePath ? req.body.sourcePath : null
    }

    try
    {
        let updateBuzzWord = await BuzzWordService.updateBuzzWord(buzzWord)
    
        return res.status(200).json({status: 200, data: updateBuzzWord, message: "Succesfully updated BuzzWord"})
    }
    catch(e)
    {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeBuzzWord = async function(req, res)
{
    let id = req.params.id;

    try
    {
        var deletedBuzzWord = await BuzzWordService(id)
    
        return res.status(204).json({status:204, message: "Succesfully BuzzWord deleted"})
    }
    catch(e)
    {
        return res.status(400).json({status: 400, message: e.message})
    }

}