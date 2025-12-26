# Portfolio Backend (Node.js)

A Node.js backend server with GraphQL API using Apollo Server and MongoDB integration for the portfolio website.

## Features

- GraphQL API with Apollo Server Express
- MongoDB database integration using Mongoose
- CORS support for development
- Environment-based configuration
- Health check endpoint
- Fail-fast validation for missing environment variables

## Prerequisites

- Node.js 18+
- MongoDB (local or cloud instance like MongoDB Atlas)

## Tech Stack

- **Express** - Web framework
- **Apollo Server Express** - GraphQL server
- **Mongoose** - MongoDB ODM
- **dotenv** - Environment variable management
- **cors** - CORS middleware
- **nodemon** - Development auto-reload

## Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/lvdb
   PORT=8080
   ```

   For MongoDB Atlas, use:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lvdb?retryWrites=true&w=majority
   PORT=8080
   ```

3. The application will fail fast with a clear error if `MONGODB_URI` is missing.

## Installation

Install dependencies:

```bash
npm install
```

## Running the Application

### Development mode (with auto-reload):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The server will start on `http://localhost:8080`

## MongoDB Setup

### Local MongoDB

If using local MongoDB, ensure it's running:

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `username`, `password`, and `cluster` in your `.env` file

## GraphQL API

### Endpoint

- `http://localhost:8080/graphql` - GraphQL endpoint with Apollo Studio (GraphQL Playground)

### Sample Queries

#### Get all tracks:

```graphql
query {
  tracks {
    id
    title
    artist
    src
    cover
    durationSeconds
    tags
    createdAt
  }
}
```

#### Get a single track:

```graphql
query {
  track(id: "track_id_here") {
    id
    title
    artist
    src
  }
}
```

### Sample Mutations

#### Create a new track:

```graphql
mutation {
  createTrack(
    title: "Song Title"
    artist: "Artist Name"
    src: "/music/song.mp3"
    cover: "/music/cover.jpg"
    durationSeconds: 240
    tags: ["pop", "indie"]
  ) {
    id
    title
    artist
  }
}
```

#### Update a track:

```graphql
mutation {
  updateTrack(
    id: "track_id_here"
    title: "Updated Title"
    tags: ["updated", "tag"]
  ) {
    id
    title
    tags
  }
}
```

#### Delete a track:

```graphql
mutation {
  deleteTrack(id: "track_id_here")
}
```

## REST Endpoints

### Health Check

- `GET /health` - Returns server status

```bash
curl http://localhost:8080/health
```

Response:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Project Structure

```
backend-node/
├── src/
│   ├── models/
│   │   └── Track.js          # Mongoose Track model
│   ├── graphql/
│   │   ├── typeDefs.js       # GraphQL schema definitions
│   │   └── resolvers.js      # GraphQL resolvers
│   ├── db.js                 # MongoDB connection
│   └── server.js             # Main server file
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Track Model Schema

```javascript
{
  title: String (required),
  artist: String (required),
  src: String (required),        // e.g., /music/song1.mp3
  cover: String (optional),       // e.g., /music/song1.jpg
  durationSeconds: Number (optional),
  tags: [String] (optional),
  createdAt: Date (auto-generated)
}
```

## Development

- The server uses `nodemon` in development mode for auto-reload on file changes
- GraphQL playground is available at the `/graphql` endpoint for testing queries
- Environment variables are loaded from `.env` using `dotenv`
- The application fails fast if `MONGODB_URI` is not set

## Error Handling

- Database connection failures will exit the application with error code 1
- Missing required environment variables will exit with a clear error message
- GraphQL errors are properly formatted and returned in responses

## Notes

- The Go backend in `backend/` is kept as a backup and uses PostgreSQL
- This Node.js backend uses MongoDB and runs on the same port (8080) by default
- Make sure to stop one backend before starting the other if using the same port
