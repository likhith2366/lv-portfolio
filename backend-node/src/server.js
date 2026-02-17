const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const { seedDefaultTrack } = require('./seed');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - Configure CORS to allow credentials
app.use(cors({
  origin: true, // Allow all origins in production (Vercel handles this)
  credentials: true, // Allow cookies/credentials
}));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ MongoDB connected successfully');
  // Seed default track if no tracks exist
  await seedDefaultTrack();
})
.catch((err) => console.error('❌ MongoDB connection error:', err));

// GraphQL endpoint
app.use('/api/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true, // Enable GraphiQL interface for testing
}));

// REST Routes
app.use('/api/movies', require('./routes/movies'));
app.use('/api/songs', require('./routes/songs'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/profile', require('./routes/profile'));

// Auth Routes
const { router: authRouter } = require('./routes/auth');
app.use('/api/auth', authRouter);

// Admin Routes (protected)
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Only start server in development, not in Vercel serverless
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints:`);
    console.log(`   - GraphQL: http://localhost:${PORT}/api/graphql`);
    console.log(`   - Movies:  http://localhost:${PORT}/api/movies`);
    console.log(`   - Songs:   http://localhost:${PORT}/api/songs`);
    console.log(`   - Projects: http://localhost:${PORT}/api/projects`);
  });
}

// Export for Vercel serverless
module.exports = app;
