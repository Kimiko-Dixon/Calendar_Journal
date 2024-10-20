const {Schema,model} = require('mongoose')
const Event = require('./Event')
const daySchema = new Schema(
    {
        date:{
            type:Date,
            required: true
        },
        events:[Event],
    }
)

const Day = model('day',daySchema)
module.exports = Day