# Portfolio Movies Backend - Node.js

Node.js backend with Express and MongoDB for the portfolio movies feature.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed locally OR MongoDB Atlas account
- npm

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend-node
npm install
```

### 2. Configure Environment

Create `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env`:

**Local MongoDB:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

**MongoDB Atlas:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

**Note:** See [SETUP_MONGODB_ATLAS.md](SETUP_MONGODB_ATLAS.md) for detailed MongoDB Atlas setup instructions.

### 3. Start MongoDB (if local)

```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 4. Seed the Database

Run the seed script to add all 57 movies:

```bash
npm run seed
```

Output:
```
✅ Connected to MongoDB
🗑️  Cleared existing movies
✅ Seeded 57 movies successfully!
```

### 5. Start the Server

```bash
npm run dev    # Development mode
npm start      # Production mode
```

Server runs on http://localhost:5000

## API Endpoints

**GET /api/movies** - Get all movies (sorted by rating desc)

**GET /api/movies/:id** - Get single movie

**GET /api/health** - Health check

## Troubleshooting

**MongoDB Connection Error:**
1. Check if MongoDB is running
2. Verify `.env` connection string
3. For Atlas: whitelist IP, check credentials

**Port in Use:**
Change PORT in `.env` and update frontend REACT_APP_API_URL

