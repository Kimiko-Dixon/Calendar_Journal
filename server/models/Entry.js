const {Schema,model} = require('mongoose')
const Priority = require('./Priority')
const Habit = require('./Habit')
const entrySchema = new Schema(
    {
        date:{
            type:Date,
            required: true
        },
        priorities:[Priority],
        habits:[Habit],
        gratitudes:{
            type:String,
            trim:true
        },
        freeWrite:{
            type:String,
            trim:true
        }
    }
)

const Entry = model('entry',entrySchema)
module.exports = Entry