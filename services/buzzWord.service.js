// Gettign the Newly created Mongoose Model we just created 
var BuzzWord = require('../models/buzzWord.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getBuzzWord = async function(query, page, limit)
{

    // Options setup for the mongoose paginate
    let options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    try 
    {
        let buzzWords = await BuzzWord.paginate(query, options)

        // Return the BuzzWord list that was retured by the mongoose promise
        return buzzWords;

    } 
    catch (e) 
    {
        // return a Error message describing the reason 
        throw Error('Error while Paginating BuzzWords')
    }
}

exports.createBuzzWord= async function(buzzWord)
{
    
    // Creating a new Mongoose Object by using the new keyword
    let newBuzzword = new BuzzWord({
        name: buzzWord.name,
        description: buzzWord.description,
        mdbId: buzzWord.mdbId,
    })

    try
    {
        let savedBuzzword = await newBuzzword.save()

        return savedBuzzword;
    }
    catch(e)
    {
        // return a Error message describing the reason     
        throw Error("Error while Creating BuzzWord")
    }
}

exports.updateBuzzWord = async function(buzzWord)
{
    let id = buzzWord.id

    try
    {    
        let oldbuzzWord = await BuzzWord.findById(id);
    }
    catch(e)
    {
        throw Error("Error occured while finding the BuzzWord")
    }

    if (!oldBuzzWord)
    {
        return false;
    }

    oldBuzzWord.name = buzzWord.name,
    oldBuzzWord.description = buzzWord.description,
    oldBuzzWord.mdbId = buzzWord.mdbId

    try
    {
        let savedBuzzword = await oldBuzzWord.save()

        return savedBuzzword;
    }
    catch (e)
    {
        throw Error("And Error occured while updating the BuzzWord");
    }
}

exports.deleteBuzzWord = async function(id)
{
    
    try
    {
        let deleted = await BuzzWord.remove({_id: id})
        if(deleted.result.n === 0)
        {
            throw Error("BuzzWord could not be deleted")
        }

        return deleted
    }
    catch (e)
    {
        throw Error("Error occured while deleting the BuzzWord")
    }
}