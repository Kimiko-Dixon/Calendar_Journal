const {Schema,model} = require('mongoose')
const Event = require('./Event')
const date = require('date-and-time')

const daySchema = new Schema(
    {
        date:{
            type:Date,
            required: true,
            unique:false
            /* get:formatDate */
        },
        events:[Event],
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
}
 */
const Day = model('day',daySchema)
module.exports = Day