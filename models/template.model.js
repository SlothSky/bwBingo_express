var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


let TemplateSchema = new mongoose.Schema({
    attr0: String,
    attr1: Number,
    attr2: String,
    attr3: Boolean,
})

TemplateSchema.plugin(mongoosePaginate)
const Template = mongoose.model('Template', TemplateSchema)

module.exports = Template;