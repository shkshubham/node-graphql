const ConferenceResolver = require('../Resolvers/Conference')
const AttendeeResolver = require('../Resolvers/Attendee')
const UserResolver = require('../Resolvers/User')
const pubsub = require('../config/pubsub')
const SubscriptionKeys = require('../Subscriptions/keys')

module.exports = {
    Subscription: {
      userRegistered: {
        subscribe: () => pubsub.asyncIterator(SubscriptionKeys.USER_REGISTERED)
      },
      conferenceAdded:{
        subscribe: () => pubsub.asyncIterator(SubscriptionKeys.CONFERENCE_ADDED)
      }
    },
    Query: {
        allConferences: ConferenceResolver.all,
        allAttendees: AttendeeResolver.all,
        ConferenceDetails: ConferenceResolver.show,
        Conference: ConferenceResolver.show,
        Attendee: AttendeeResolver.show,
        profile: UserResolver.profile,
        allUser: UserResolver.all
    },
    Mutation: {
        createConference: ConferenceResolver.create,
        createAttendee: AttendeeResolver.create,
        updateConference: ConferenceResolver.update,
        deleteConference: ConferenceResolver.remove,
        updateAttendee: AttendeeResolver.update,
        deleteAttendee: AttendeeResolver.remove,
        addAttendeeToConference: ConferenceResolver.addAddenteeToConference,
        register: UserResolver.register,
        login: UserResolver.login,
        uploadFile:(_, {file}) =>{
          console.log(file)
          return file
        }
    }
}
