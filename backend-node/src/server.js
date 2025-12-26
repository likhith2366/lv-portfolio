require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { connectDB } = require('./db');
const { seedDefaultTrack } = require('./seed');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const isDev = process.env.NODE_ENV !== 'production';

// Log environment variables on startup (excluding secrets)
if (isDev) {
  console.log('\n=== Environment Configuration ===');
  console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
  console.log('PORT:', process.env.PORT || '8080 (default)');
  console.log('MONGODB_URI:', process.env.MONGODB_URI ? '[SET]' : '[NOT SET]');
  console.log('================================\n');
}

async function startServer() {
  // Create Express app
  const app = express();

  // CORS configuration - allow frontend origins
  const corsOptions = {
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:8080',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.use(cors(corsOptions));
  app.use(express.json());

  // Serve static files from frontend's public/Assets folder
  const path = require('path');
  const assetsPath = path.join(__dirname, '../../frontend/public/Assets');
  app.use('/Assets', express.static(assetsPath));
  console.log('✓ Static assets folder mounted at /Assets');
  if (isDev) console.log(`  Path: ${assetsPath}`);

  // Log incoming requests in dev mode
  if (isDev) {
    app.use((req, _res, next) => {
      console.log(`[${req.method}] ${req.url}`);
      next();
    });
  }

  // Connect to MongoDB before starting server
  await connectDB();

  // Auto-seed one track if collection is empty
  await seedDefaultTrack();

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    introspection: isDev, // Enable introspection in development
    playground: isDev, // Enable playground in development
    plugins: [
      // Log GraphQL operations in development
      {
        async requestDidStart(requestContext) {
          if (isDev && requestContext.request.operationName) {
            console.log(`[GraphQL] ${requestContext.request.operationName}`);
          }
        },
      },
    ],
  });

  // Start Apollo Server
  await server.start();

  // Health check endpoint (before GraphQL for debugging)
  app.get('/health', (req, res) => {
    if (isDev) console.log('[Health Check] Endpoint hit');
    res.json({
      status: 'ok',
      message: 'Server is running',
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    });
  });

  // Apply Apollo middleware to Express at /graphql
  server.applyMiddleware({ app, path: '/graphql', cors: false }); // CORS already configured above
  console.log('✓ GraphQL mounted at /graphql');

  // Start the server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`Environment: ${isDev ? 'development' : 'production'}`);
  });
}

// Handle graceful shutdown
async function gracefulShutdown(signal) {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
