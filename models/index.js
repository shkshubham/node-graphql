const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConferenceSchema = new Schema({
    conference_id: Number,
    name: String,
    city: String,
    year: String,
    attendees: []
});

const AttendeeSchema = new Schema({
    attendee_id: Number,
    name: String,
});


const Conference = mongoose.model("conferences", ConferenceSchema);
const Attendee = mongoose.model("attendees", AttendeeSchema);

module.exports = {
    Conference,
    Attendee
};