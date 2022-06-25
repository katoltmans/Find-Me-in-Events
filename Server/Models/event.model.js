const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
    {
        eventTitle : {
            type: String,
            required : [true, 'Event must have a title'],
            minlength : [5, 'Title can\'t be less than 5 characters']
    },
        location : {
            type: String,
            required : [true, 'Where\'s the Event located?'],
            minlength : [3, 'Location must be at least 3 characters']
        },
        date : {
            type : Date,
            required : [true, 'When\'s the Event?']
        }, 
        time : {
            type : String,
            required : [true, 'Can\'t have an Event without a set time, come on!']
        },
        description : {
            type: String, 
            required : [true, 'Tell us what the Event is about.'],
            minlength : [10, 'Describe Event in minimum of 10 characters.']
        },

        image : {
            type: String,
            default: "/image/Meetup.png",
        },
    },
    {timestamps:true}
)

const Event = mongoose.model('Events', EventSchema);
module.exports = Event;