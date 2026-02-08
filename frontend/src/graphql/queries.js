import { gql } from '@apollo/client';

// Music queries
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

// Professional portfolio queries
export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      subtitle
      role
      category
      description
      detailedDescription
      techStack
      achievements
      github
      liveUrl
      gradient
      color
      order
      createdAt
    }
  }
`;

export const SEND_CONTACT_MESSAGE = gql`
  mutation SendContactMessage($input: ContactMessageInput!) {
    sendContactMessage(input: $input) {
      success
      message
    }
  }
`;
