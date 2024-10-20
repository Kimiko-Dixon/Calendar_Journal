const {Schema} = require('mongoose')

const prioritySchema = new Schema(
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


module.exports = prioritySchema