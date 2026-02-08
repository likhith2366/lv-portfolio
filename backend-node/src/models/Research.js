const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authors: [String],
  abstract: String,
  publicationDate: String,
  journal: String,
  conference: String,
  doi: String,
  pdfUrl: String,
  tags: [String],
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Research', researchSchema);
