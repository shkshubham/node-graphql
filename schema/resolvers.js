const models = require('../models/')
const ConferenceResolver = require('../Resolvers/Conference')
const AttendeeResolver = require('../Resolvers/Attendee')

module.exports = {
    Query: {
        allConferences: ConferenceResolver.all,
        allAttendees: AttendeeResolver.all,
        ConferenceDetails: ConferenceResolver.show,
        Conference: ConferenceResolver.show,
        Attendee: AttendeeResolver.show,
    },
    Mutation: {
        createConference: ConferenceResolver.create,
        createAttendee: AttendeeResolver.create,
        updateConference: ConferenceResolver.update,
        deleteConference: ConferenceResolver.remove,
        updateAttendee: AttendeeResolver.update,
        deleteAttendee: AttendeeResolver.remove,
        addAttendeeToConference: ConferenceResolver.addAddenteeToConference
    }
}