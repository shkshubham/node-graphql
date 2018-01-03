const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
// Define your types here.
const typeDefs = `
  input Upload{
    name: String!
    type: String!
    size: Int!
    path: String!
  }
  type Conference {
    id: ID!,
    conference_id: Int!
    name: String!
    city: String!
    year: String!
    attendees: [Attendee!]
  }

  type Attendee {
    id: ID!
    name: String!
  }
  type Query{
      allConferences:[Conference!],
      allAttendees: [Attendee!],
      Conference(id:String):[Conference!],
      Attendee(id:ID):[Attendee!],
      ConferenceDetails(id: ID):[Conference]
  }

  type Mutation {
    uploadFile(file: Upload!): Boolean!,
    createConference(name: String!, city: String!, year: String!): Conference,
    createAttendee(name: String!, conference_id:String): Attendee,
    updateConference(id:String!,name: String, city: String, year: String): Conference,
    deleteConference(id:String!): Conference,
    deleteAttendee(id:String!): Attendee,
    updateAttendee(id:String!,conference_id:String,name: String): Attendee,
    addAttendeeToConference(id:String!,conference_id:String!): Attendee
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers });
