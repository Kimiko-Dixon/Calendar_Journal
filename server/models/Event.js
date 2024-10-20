const {Schema} = require('mongoose')
const date = require('date-and-time')
const meridiem = require('date-and-time/plugin/meridiem')
date.plugin(meridiem)

const prioritySchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        startTime:{
            type:Date,
            required:true,
            get:formatTime
        },
        endTime:{
            type:Date,
            required:true,
            get:formatTime
        },
        Location:{
            type:String,
        }
    },
    {
        toJSON:{
            getters:true
        },
        id:false
    }
)

function formatTime(day){
    return date.format(day,'h:mm a')
}


module.exports = prioritySchema