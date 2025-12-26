const Track = require('../models/Track');

const isDev = process.env.NODE_ENV !== 'production';

const resolvers = {
  Query: {
    // Get all tracks with pagination and search
    tracks: async (_, { limit = 20, offset = 0, search }) => {
      try {
        let query = {};

        // Add search filter if provided (regex search on title and artist)
        if (search && search.trim()) {
          const searchRegex = new RegExp(search.trim(), 'i');
          query = {
            $or: [
              { title: searchRegex },
              { artist: searchRegex },
            ],
          };
        }

        // Fetch tracks with pagination, sorted by createdAt DESC
        return await Track.find(query)
          .sort({ createdAt: -1 })
          .skip(offset)
          .limit(limit);
      } catch (error) {
        if (isDev) console.error('Error fetching tracks:', error);
        throw new Error('Failed to fetch tracks. Please try again later.');
      }
    },

    // Get a single track by ID
    track: async (_, { id }) => {
      try {
        const track = await Track.findById(id);
        if (!track) {
          throw new Error('Track not found');
        }
        return track;
      } catch (error) {
        if (isDev) console.error('Error fetching track:', error);
        throw new Error(error.message === 'Track not found' ? error.message : 'Failed to fetch track. Please try again later.');
      }
    },
  },

  Mutation: {
    // Create a new track
    createTrack: async (_, { title, artist, src, cover, durationSeconds, tags }) => {
      try {
        const track = new Track({
          title,
          artist,
          src,
          cover,
          durationSeconds,
          tags,
        });
        return await track.save();
      } catch (error) {
        if (isDev) console.error('Error creating track:', error);
        throw new Error('Failed to create track. Please check your input and try again.');
      }
    },

    // Update an existing track
    updateTrack: async (_, { id, ...updates }) => {
      try {
        const track = await Track.findByIdAndUpdate(
          id,
          { $set: updates },
          { new: true, runValidators: true }
        );
        if (!track) {
          throw new Error('Track not found');
        }
        return track;
      } catch (error) {
        if (isDev) console.error('Error updating track:', error);
        throw new Error(error.message === 'Track not found' ? error.message : 'Failed to update track. Please try again later.');
      }
    },

    // Delete a track
    deleteTrack: async (_, { id }) => {
      try {
        const result = await Track.findByIdAndDelete(id);
        if (!result) {
          throw new Error('Track not found');
        }
        return true;
      } catch (error) {
        if (isDev) console.error('Error deleting track:', error);
        throw new Error(error.message === 'Track not found' ? error.message : 'Failed to delete track. Please try again later.');
      }
    },
  },
};

module.exports = resolvers;
