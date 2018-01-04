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

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model("users", UserSchema);
const Conference = mongoose.model("conferences", ConferenceSchema);
const Attendee = mongoose.model("attendees", AttendeeSchema);

module.exports = {
    Conference,
    Attendee,
    User
};
