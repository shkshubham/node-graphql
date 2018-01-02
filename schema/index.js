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
      allTable: [Table!]
  }

  type Mutation {
    createLink(url: String!, description: String!): Link,
    createUser(name: String!, authProvider: AuthProviderSignupData!): User
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers });