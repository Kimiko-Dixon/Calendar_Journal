const {Schema} = require('mongoose')

const gratitudeSchema = new Schema(
    {
        text:{
            type:String,
            required:true
        }
    }
)


module.exports = gratitudeSchema