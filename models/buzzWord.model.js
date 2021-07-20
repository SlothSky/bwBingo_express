var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


let BuzzWordSchema = new mongoose.Schema({
    name: String,
    description: String,
    mdb_id: Number,
})

BuzzWordSchema.plugin(mongoosePaginate)
const BuzzWord = mongoose.model('BuzzWord', BuzzWordSchema)

module.exports = BuzzWord;