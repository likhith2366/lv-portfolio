const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  watched: {
    type: Boolean,
    default: false
  },
  imdbRating: {
    type: Number,
    default: 7.5,
    min: 0,
    max: 10
  },
  posterUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
