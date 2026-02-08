const mongoose = require('mongoose');
const Song = require('../models/Song');
require('dotenv').config();

const songs = [
  {
    title: 'Oka Maru Kalisina Andam',
    artist: 'SenSongs',
    url: '/Assets/Song/Oka%20Maru%20Kalisina%20Andam%20-%20SenSongsMp3.Co.mp3',
    duration: '4:00'
  }
];

const seedDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing songs
    await Song.deleteMany({});
    console.log('🗑️  Cleared existing songs');

    // Insert new songs
    const createdSongs = await Song.insertMany(songs);
    console.log(`✅ Seeded ${createdSongs.length} songs successfully!`);

    console.log('\n🎵 Sample songs:');
    createdSongs.slice(0, 5).forEach(song => {
      console.log(`  - ${song.title} by ${song.artist} (${song.duration})`);
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
