const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GET all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ imdbRating: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single movie
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST seed movies (for initial setup)
router.post('/seed', async (req, res) => {
  try {
    const { movies } = req.body;
    await Movie.deleteMany({});  // Clear existing
    const createdMovies = await Movie.insertMany(movies);
    res.status(201).json({ 
      message: 'Movies seeded successfully', 
      count: createdMovies.length 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
