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

  type Query {
    tracks(
      limit: Int
      offset: Int
      search: String
    ): [Track!]!
    track(id: ID!): Track
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
  }
`;

module.exports = typeDefs;
