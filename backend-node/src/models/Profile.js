const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  location: String,
  linkedin: String,
  github: String,
  instagram: String,
  profilePicture: String,
  resumePath: String,
  about: {
    type: String
  },
  stats: {
    gpa: String,
    projects: Number,
    techStack: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
