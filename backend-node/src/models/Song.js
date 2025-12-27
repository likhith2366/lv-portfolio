const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: '0:00'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Song', songSchema);
