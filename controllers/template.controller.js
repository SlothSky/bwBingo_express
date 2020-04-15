// Accessing the Service that we just created

var TemplateService = require('../services/template.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getTemplate = async function(req, res, next)
{


    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    let query = req.query ? req.query : {};
    let page = req.query.page ? req.query.page : 1;
    let limit = req.query.limit ? req.query.limit : 10; 

    try
    {
        let templates = await TemplateService.getTemplates(query, page, limit)

        // Return the todos list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({status: 200, data: templates, message: "Succesfully Templates Recieved"});
    }
    catch(e)
    {    
        //Return an Error Response Message with Code and the Error Message.      
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createTemplate = async function(req, res, next)
{

    // Req.Body contains the form submit values.
    let template = {
        attr0: req.body.attr0,
        attr1: req.body.attr1,
        attr2: req.body.attr2,
        attr3: req.body.attr3
    }

    try
    {
        // Calling the Service function with the new object from the Request Body
        let createdTemplate = await TemplateService.createTemplate(template)

        return res.status(201).json({status: 201, data: createdTemplate, message: "Succesfully created Template"})
    }
    catch(e)
    {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Template creation was unsuccesful"})
    }
}

exports.updateTemplate = async function(req, res, next)
{

    // Id is necessary for the update

    if(!req.body._id)
    {
        return res.status(400).json({status: 400, message: "Id must be present"})
    }

    let id = req.body._id;


    let template = {
        id,
        attr0: req.body.attr0 ? req.body.attr0 : null,
        attr1: req.body.attr1 ? req.body.attr1 : null,
        attr2: req.body.attr2 ? req.body.attr2 : null,
        attr3: req.body.attr3 ? req.body.attr3 : null
    }

    try
    {
        let updateTemplate = await TemplateService.updateTemplate(template)
    
        return res.status(200).json({status: 200, data: updateTemplate, message: "Succesfully updated Template"})
    }
    catch(e)
    {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeTemplate = async function(req, res, next)
{

    let id = req.params.id;

    try
    {
        var deleted = await TemplateService.deleteTemplate(id)
    
        return res.status(204).json({status:204, message: "Succesfully Template deleted"})
    }
    catch(e)
    {
        return res.status(400).json({status: 400, message: e.message})
    }

}