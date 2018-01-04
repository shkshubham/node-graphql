const ConferenceResolver = require('../Resolvers/Conference')
const AttendeeResolver = require('../Resolvers/Attendee')
const UserResolver = require('../Resolvers/User')
const { PubSub } = require('graphql-subscriptions')

const USER_ADDED_KEY = "USER_ADDED_SUCCESS"

module.exports = {
    Subscription: {
      userAdded: {
        subscribe: () => pubsub.asyncIterator(USER_ADDED_KEY),
      },
    },
    Query: {
        allConferences: ConferenceResolver.all,
        allAttendees: AttendeeResolver.all,
        ConferenceDetails: ConferenceResolver.show,
        Conference: ConferenceResolver.show,
        Attendee: AttendeeResolver.show,
        profile: UserResolver.profile
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
        },
        createUser:(_,{username})=>{
          var user = data
          pubsub.publish(USER_ADDED_KEY, { userAdded: { id: "123",username:username }});
          return user
        }
    }
}
