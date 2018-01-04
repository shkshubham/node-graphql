const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
// Define your types here.
const typeDefs = `
  type Subscription {
    userAdded: User!
  }
  input Upload{
    name: String!
    type: String!
    size: Int!
    path: String!
  }
  type Token{
    token: String
    email: String
  }
  type User{
    id: String!
    username: String!
    email: String!
    name: String!
    password: String!
    created_at: String
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
      allConferences(limit: Int):[Conference!],
      allAttendees: [Attendee!],
      Conference(id:String):[Conference!],
      Attendee(id:ID):[Attendee!],
      ConferenceDetails(id: ID):[Conference],
      allUser: [User],
      profile: User
  }

  type Mutation {
    uploadFile(file: Upload!): Boolean!
    createConference(name: String!, city: String!, year: String!): Conference
    createAttendee(name: String!, conference_id:String): Attendee
    updateConference(id:String!,name: String, city: String, year: String): Conference
    deleteConference(id:String!): Conference
    deleteAttendee(id:String!): Attendee
    updateAttendee(id:String!,conference_id:String,name: String): Attendee
    addAttendeeToConference(id:String!,conference_id:String!): Attendee
    register(username:String!,name:String!,email:String!,password:String!): User
    login(email:String!,password:String!): Token
    createUser(username:String!): User!
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers });
