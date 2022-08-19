const { gql } = require("apollo-server-express");


const typeDefs = gql`

scalar DateTime

  type Query {
    hello: String
    name: String
    events: [Event]
  }
  type Event {
    id: ID!
    type: EventType!
    name: String!
    description: String
    category: EventCategory!
    # Will make it date time in future.
    startTime: DateTime!
    locationDesc: String
    durationInMin: Int!
    location: String!
    image: String!
  }
  enum EventType {
    ONET
    WEEKLY
  }
  enum EventCategory {
    ACADEMIC
    MESS
    CLUB
    INSTITUTE
  }
`;

module.exports = { typeDefs };
