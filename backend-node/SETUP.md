# Backend Node.js - Setup Complete

## Summary of Changes

### ✅ GraphQL Server Configuration
- Apollo Server mounted at `/graphql`
- GraphQL Playground/Sandbox enabled in development mode
- Introspection enabled for development
- Request logging: Each GraphQL operation name is logged in dev mode

### ✅ CORS Configuration
- Allows origins: `http://localhost:3000`, `http://localhost:5173`, `http://localhost:8080`
- Credentials support enabled

### ✅ MongoDB Connection
- Connection established **before** server starts listening
- Fail-fast validation for missing `MONGODB_URI`
- Graceful shutdown on SIGINT/SIGTERM with proper MongoDB connection closing

### ✅ Auto-Seeding
- If no tracks exist in database, automatically seeds one default track on server startup
- Runs only once - checks collection count before seeding

### ✅ Track Model Schema
Fields (all verified):
- `title` (String, required)
- `artist` (String, required)
- `src` (String, required)
- `cover` (String, optional)
- `durationSeconds` (Number, optional)
- `tags` (Array of Strings, optional)
- `createdAt` (Date, auto-generated)

### ✅ MongoDB Indexes (Performance)
- `createdAt: -1` - For efficient sorting by newest first
- `title: text, artist: text` - For text search capabilities
- `artist: 1` - For filtering by artist

### ✅ GraphQL Query - Pagination & Search
```graphql
query {
  tracks(
    limit: 20        # Default: 20
    offset: 0        # Default: 0
    search: "query"  # Optional: searches title and artist with regex
  ) {
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

- Results sorted by `createdAt DESC` (newest first)
- Search uses case-insensitive regex on `title` and `artist` fields
- Pagination with `limit` and `offset` parameters

## How to Run

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Start MongoDB**:
   - Local: `mongod` or use MongoDB Compass
   - Cloud: Use MongoDB Atlas connection string in `.env`

3. **Run the server**:
   ```bash
   npm run dev
   ```

4. **Access GraphQL Playground**:
   - Open: `http://localhost:8080/graphql`

## Test Queries

### Get all tracks (with default pagination):
```graphql
query {
  tracks {
    id
    title
    artist
    src
  }
}
```

### Get tracks with pagination:
```graphql
query {
  tracks(limit: 10, offset: 0) {
    id
    title
    artist
  }
}
```

### Search tracks:
```graphql
query {
  tracks(search: "Oka") {
    id
    title
    artist
  }
}
```

### Get single track:
```graphql
query {
  track(id: "track_id_here") {
    title
    artist
    src
  }
}
```

## Features Implemented

✅ Apollo Server at `/graphql`
✅ GraphQL Playground enabled in dev
✅ Request logging in dev mode
✅ MongoDB connection before server start
✅ Graceful shutdown (closes MongoDB connection)
✅ CORS for localhost:3000 and localhost:5173
✅ Track schema with exact fields
✅ Auto-seed one track if collection empty
✅ Pagination (limit/offset)
✅ Search (regex on title/artist)
✅ Sorting by createdAt DESC
✅ MongoDB indexes for performance

## Next Steps

- Start MongoDB
- Run `npm run dev`
- Test queries in GraphQL Playground
- Integrate with frontend
