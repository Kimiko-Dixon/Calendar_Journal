const {Schema,model} = require('mongoose')
const Priority = require('./Priority')
const Habit = require('./Habit')
const Gratitude = require('./Gratitude')
const date = require('date-and-time')

const entrySchema = new Schema(
    {
        date:{
            type:Date,
            required: true,
            /* get:formatDate */
        },
        priorities:[Priority],
        habits:[Habit],
        gratitudes:[Gratitude],
        freeWrite:{
            type:String,
            
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'user'
        }
    },
/*     {
        toJSON:{
            getters:true
        }
    } */
)


/* function formatDate(day){
    return date.format(day,'YYYY-MM-DD')
} */
const Entry = model('entry',entrySchema)
module.exports = Entry