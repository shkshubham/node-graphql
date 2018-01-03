const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
// Define your types here.
const typeDefs = `
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
    conferences: [Conference!]
  }
  type Query{
      allConferences:[Conference!],
      allAttendees: [Attendee!],
      Conference(id:String):[Conference!],
      Attendee(id:ID):[Attendee!],
      ConferenceDetails(id: ID):[Conference]
  }

  type Mutation {
    createConference(name: String!, city: String!, year: String!): Conference,
    createAttendee(name: String!): Attendee,
    updateConference(id:String!,name: String, city: String, year: String): Conference,
    deleteConference(id:String!): Conference,
    deleteAttendee(id:String!): Attendee,    
    updateAttendee(id:ID!,name: String): Attendee
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers });