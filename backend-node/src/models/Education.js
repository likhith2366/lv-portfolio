const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  location: String,
  gpa: String,
  startDate: String,
  endDate: String,
  status: {
    type: String,
    enum: ['In Progress', 'Completed'],
    default: 'Completed'
  },
  courses: [String],
  achievements: [String],
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Education', educationSchema);
