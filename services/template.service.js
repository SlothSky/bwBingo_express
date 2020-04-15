// Gettign the Newly created Mongoose Model we just created 
var Template = require('../models/template.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getTemplates = async function(query, page, limit)
{

    // Options setup for the mongoose paginate
    let options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    try 
    {
        let templates = await Template.paginate(query, options)

        // Return the Template list that was retured by the mongoose promise
        return templates;

    } 
    catch (e) 
    {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Templates')
    }
}

exports.createTemplate= async function(template)
{
    
    // Creating a new Mongoose Object by using the new keyword
    let newTemplate = new Template({
        attr0: template.attr0,
        attr1: template.attr1,
        attr2: template.attr2,
        attr3: template.attr3,
    })

    try
    {
        let savedTemplate = await newTemplate.save()

        return savedTemplate;
    }
    catch(e)
    {
        // return a Error message describing the reason     
        throw Error("Error while Creating Template")
    }
}

exports.updateTemplate = async function(template)
{
    let id = template.id

    try
    {    
        let oldTemplate = await Template.findById(id);
    }
    catch(e)
    {
        throw Error("Error occured while finding the Template")
    }

    if(!oldTemplate)
    {
        return false;
    }

    oldTemplate.attr0 = template.attr0,
    oldTemplate.attr1 = template.attr1,
    oldTemplate.attr2 = template.attr2,
    oldTemplate.attr3 = template.attr3

    try
    {
        let savedTemplate = await oldTemplate.save()

        return savedTemplate;
    }
    catch(e)
    {
        throw Error("And Error occured while updating the Template");
    }
}

exports.deleteTemplate = async function(id)
{
    
    try
    {
        let deleted = await Template.remove({_id: id})
        if(deleted.result.n === 0)
        {
            throw Error("Template could not be deleted")
        }

        return deleted
    }
    catch(e)
    {
        throw Error("Error occured while deleting the Template")
    }
}