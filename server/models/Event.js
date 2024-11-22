const {Schema} = require('mongoose')
const date = require('date-and-time')
const meridiem = require('date-and-time/plugin/meridiem')
date.plugin(meridiem)

const eventSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        start:{
            type:Date,
            required:true,
            /* get:formatTime */
        },
        end:{
            type:Date,
            required:true,
            /* get:formatTime */
        },
        location:{
            type:String,
        }
    },
    /* {
        toJSON:{
            getters:true
        },
        id:false
    } */
)

/* function formatTime(day){
    return date.format(day,'h:mm a')
} */


module.exports = eventSchema