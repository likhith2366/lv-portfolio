import { gql } from '@apollo/client';

export const GET_TRACKS = gql`
  query GetTracks($limit: Int, $offset: Int, $search: String) {
    tracks(limit: $limit, offset: $offset, search: $search) {
      id
      title
      artist
      src
      cover
      durationSeconds
      tags
      createdAt
    }
  }
`;

export const GET_TRACK = gql`
  query GetTrack($id: ID!) {
    track(id: $id) {
      id
      title
      artist
      src
      cover
      durationSeconds
      tags
      createdAt
    }
  }
`;
