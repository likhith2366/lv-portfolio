const mongoose = require('mongoose');

/**
 * Connect to MongoDB
 */
async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('ERROR: MONGODB_URI environment variable is not set');
    console.error('Please create a .env file with MONGODB_URI or set it in your environment');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ MongoDB connected successfully');
    console.log(`  Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('✗ Failed to connect to MongoDB:', error.message);
    console.error('  Make sure MongoDB is running and MONGODB_URI is correct');
    process.exit(1);
  }

  // Handle connection events
  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });
}

module.exports = { connectDB };
