const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
// Define your types here.
const typeDefs = `
  type Alcohol{
    id: ID!,
    type: String!
  }

  type Order{
    id: ID!,
    order_element: [Alcohol]
  }  
  
  type Table{
    id: ID!,
    status: Int!,
    order: [Order!]
  }
  
  type Link {
    id: ID!
    url: String!
    description: String!
  }
  type User {
    id: ID!
    name: String!
    email: String
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
    conferences: [Conference!]
  }
  input AuthProviderSignupData {
    email: AUTH_PROVIDER_EMAIL
  }

  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }
  type Query{
      allLinks: [Link!]!,
      allAlcohol: [Alcohol!],
      allOrder: [Order!],
      allTable: [Table!],
      allConferences:[Conference!],
      Conference(id:ID):[Conference!],      
      ConferenceDetails(id: ID):[Conference]
  }

  type Mutation {
    createLink(url: String!, description: String!): Link,
    createUser(name: String!, authProvider: AuthProviderSignupData!): User,
    createConference(name: String!, city: String!, year: String!): Conference,
    createAttendee(name: String!): Attendee,
    updateConference(id:ID,name: String, city: String, year: String): Conference
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers });