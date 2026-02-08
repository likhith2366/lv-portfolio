const Track = require('./models/Track');

/**
 * Seed one default track if the collection is empty
 */
async function seedDefaultTrack() {
  try {
    const count = await Track.countDocuments();

    if (count === 0) {
      console.log('No tracks found. Seeding default track...');

      const defaultTrack = new Track({
        title: 'Oka Maru Kalisina Andam',
        artist: 'SenSongs',
        src: '/Assets/Song/Oka Maru Kalisina Andam - SenSongsMp3.Co.mp3',
        cover: null, // No cover image available
        durationSeconds: 240,
        tags: ['telugu', 'movie', 'south-indian'],
      });

      await defaultTrack.save();
      console.log('Default track seeded successfully');
    } else {
      console.log(`Found ${count} track(s) in database`);
    }
  } catch (error) {
    console.error('Error seeding default track:', error.message);
  }
}

module.exports = { seedDefaultTrack };
