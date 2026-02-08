const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Track {
    id: ID!
    title: String!
    artist: String!
    src: String!
    cover: String
    durationSeconds: Int
    tags: [String!]
    createdAt: String!
  }

  type Project {
    id: ID!
    title: String!
    subtitle: String!
    role: String!
    category: [String!]!
    description: String!
    detailedDescription: String!
    techStack: [String!]!
    achievements: [String!]
    github: String
    liveUrl: String
    gradient: String
    color: String
    order: Int
    createdAt: String!
  }

  type ContactMessageResponse {
    success: Boolean!
    message: String!
  }

  type Query {
    tracks(
      limit: Int
      offset: Int
      search: String
    ): [Track!]!
    track(id: ID!): Track
    projects: [Project!]!
  }

  type Mutation {
    createTrack(
      title: String!
      artist: String!
      src: String!
      cover: String
      durationSeconds: Int
      tags: [String!]
    ): Track!

    updateTrack(
      id: ID!
      title: String
      artist: String
      src: String
      cover: String
      durationSeconds: Int
      tags: [String!]
    ): Track

    deleteTrack(id: ID!): Boolean!

    sendContactMessage(input: ContactMessageInput!): ContactMessageResponse!
  }

  input ContactMessageInput {
    name: String!
    email: String!
    message: String!
  }
`;

module.exports = typeDefs;
