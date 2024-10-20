const {Schema} = require('mongoose')

const habitSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        isDone:{
            type:Boolean,
            default:false
        },
    }
)


module.exports = habitSchema