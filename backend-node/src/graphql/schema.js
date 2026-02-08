const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLID, GraphQLNonNull } = require('graphql');
const Track = require('../models/Track');
const Movie = require('../models/Movie');

// Track Type (used for songs/music)
const TrackType = new GraphQLObjectType({
  name: 'Track',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    artist: { type: GraphQLString },
    src: { type: GraphQLString },
    cover: { type: GraphQLString },
    durationSeconds: { type: GraphQLInt },
    tags: { type: new GraphQLList(GraphQLString) },
    createdAt: {
      type: GraphQLString,
      resolve: (parent) => parent.createdAt ? parent.createdAt.toISOString() : null
    }
  })
});

// Movie Type
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    watched: { type: GraphQLString },
    imdbRating: { type: GraphQLInt },
    posterUrl: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
      resolve: (parent) => parent.createdAt ? parent.createdAt.toISOString() : null
    }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Get all tracks (songs)
    tracks: {
      type: new GraphQLList(TrackType),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        search: { type: GraphQLString }
      },
      async resolve(parent, args) {
        try {
          let query = {};

          // Add search filter if provided
          if (args.search) {
            query = {
              $or: [
                { title: { $regex: args.search, $options: 'i' } },
                { artist: { $regex: args.search, $options: 'i' } }
              ]
            };
          }

          const tracks = await Track.find(query)
            .sort({ createdAt: -1 })
            .limit(args.limit || 100)
            .skip(args.offset || 0);

          return tracks;
        } catch (error) {
          console.error('Error fetching tracks:', error);
          throw error;
        }
      }
    },

    // Get single track by ID
    track: {
      type: TrackType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        try {
          return await Track.findById(args.id);
        } catch (error) {
          console.error('Error fetching track:', error);
          throw error;
        }
      }
    },

    // Get all movies
    movies: {
      type: new GraphQLList(MovieType),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        try {
          return await Movie.find()
            .sort({ imdbRating: -1 })
            .limit(args.limit || 100)
            .skip(args.offset || 0);
        } catch (error) {
          console.error('Error fetching movies:', error);
          throw error;
        }
      }
    },

    // Get single movie by ID
    movie: {
      type: MovieType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        try {
          return await Movie.findById(args.id);
        } catch (error) {
          console.error('Error fetching movie:', error);
          throw error;
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
