const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: false,
  },
  durationSeconds: {
    type: Number,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create indexes for performance
trackSchema.index({ createdAt: -1 }); // For sorting by newest first
trackSchema.index({ title: 'text', artist: 'text' }); // For text search
trackSchema.index({ artist: 1 }); // For filtering by artist

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
