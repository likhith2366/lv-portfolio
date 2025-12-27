const mongoose = require('mongoose');
const Movie = require('../models/Movie');
require('dotenv').config();

// Function to generate deterministic pseudo-random rating
function generateRating(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = ((hash << 5) - hash) + title.charCodeAt(i);
    hash = hash & hash;
  }
  // Generate rating between 6.5 and 9.2
  const normalized = Math.abs(hash % 270) / 100;
  return Math.round((6.5 + normalized) * 10) / 10;
}

const movies = [
  { title: 'Atypical', watched: false },
  { title: 'American animals', watched: true },
  { title: 'Marmalade', watched: false },
  { title: 'The place beyond the pines', watched: false },
  { title: 'The instigators', watched: false },
  { title: 'Pre destination', watched: true },
  { title: 'Source code', watched: true },
  { title: 'Primer', watched: false },
  { title: 'Volition', watched: false },
  { title: 'Caddo lake', watched: false },
  { title: 'Donnie darko', watched: false },
  { title: 'Lubber pantu', watched: true },
  { title: 'Kishkinda kanda', watched: true },
  { title: 'The prestige', watched: false },
  { title: 'Kill Bill', watched: true },
  { title: 'The art of racing in rain', watched: true },
  { title: 'Demolition', watched: false },
  { title: 'Kill boksoon', watched: false },
  { title: 'Incendies', watched: false },
  { title: 'Guilty', watched: true },
  { title: 'Peanut butter falcon', watched: true },
  { title: 'Anyone but you', watched: true },
  { title: 'The boy in the striped pyjamas', watched: false },
  { title: 'Sookshmadarshini', watched: true },
  { title: 'Bougainvillea', watched: true },
  { title: 'The platform', watched: true },
  { title: 'Pani', watched: true },
  { title: 'The parent trap', watched: false },
  { title: 'Good will hunting', watched: true },
  { title: 'Baby reindeer', watched: false },
  { title: 'Blink twice', watched: false },
  { title: 'High potential', watched: false },
  { title: 'Inside man', watched: true },
  { title: 'Tetris', watched: false },
  { title: 'Catholic school', watched: false },
  { title: 'Bird box', watched: true },
  { title: 'A quiet place', watched: false },
  { title: 'Ocean eleven', watched: true },
  { title: 'Green book', watched: false },
  { title: 'Perusu', watched: true },
  { title: 'The departed', watched: true },
  { title: 'Django unchained', watched: true },
  { title: 'Inglourious basterds', watched: false },
  { title: 'Casino', watched: false },
  { title: 'American wrestler', watched: false },
  { title: 'The vault', watched: false },
  { title: 'No mercy for none', watched: true },
  { title: 'The good lie', watched: false },
  { title: 'The proposal', watched: false },
  { title: 'We were liars', watched: false },
  { title: 'Perfect couple', watched: false },
  { title: 'Running point', watched: false },
  { title: 'Monte Carlo', watched: false },
  { title: 'The others', watched: false },
  { title: 'Searching for bobby fischer', watched: false }
].map(movie => ({
  ...movie,
  imdbRating: generateRating(movie.title),
  posterUrl: '/Assets/movies/download.jpg'
}));

const seedDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing movies
    await Movie.deleteMany({});
    console.log('🗑️  Cleared existing movies');

    // Insert new movies
    const createdMovies = await Movie.insertMany(movies);
    console.log(`✅ Seeded ${createdMovies.length} movies successfully!`);

    console.log('\n📊 Sample movies:');
    createdMovies.slice(0, 5).forEach(movie => {
      console.log(`  - ${movie.title} (${movie.imdbRating}) ${movie.watched ? '✓' : '✗'}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
