const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  category: [{
    type: String,
    enum: ['fullstack', 'backend', 'ml', 'devops'],
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  detailedDescription: {
    type: String,
    required: true
  },
  techStack: [{
    type: String,
    required: true
  }],
  achievements: [{
    type: String
  }],
  github: {
    type: String
  },
  liveUrl: {
    type: String
  },
  gradient: {
    type: String,
    default: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
  },
  color: {
    type: String,
    default: '#6366f1'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
