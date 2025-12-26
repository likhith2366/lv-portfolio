# Likhith Vardhan's Portfolio

A modern, interactive portfolio website featuring a 3D robot model, music player with GraphQL integration, and Netflix-style animations. Built with React, Node.js, GraphQL, and MongoDB.

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-E10098?logo=graphql)](https://www.apollographql.com/)

## ✨ Features

### Frontend
- **🤖 Interactive 3D Model**: Cursor-responsive 3D robot built with React Three Fiber
- **🎵 Music Player**:
  - GraphQL-powered playlist with real-time updates
  - Search functionality with 300ms debouncing
  - Shuffle and repeat modes (OFF → ALL → ONE)
  - Draggable player interface with viewport constraints
  - Audio fade in/out effects (200ms)
  - Keyboard shortcuts (Space, Cmd/Ctrl + Arrow keys)
  - Expandable/collapsible playlist
- **❄️ Snow Effect**: Toggleable snow animation with letter accumulation
- **🎬 LV Reveal Animation**: Netflix-style intro animation on double-click
- **📱 Responsive Design**: Mobile-friendly with adaptive layouts
- **🌑 Dark Theme**: Minimal, Grok-inspired aesthetic

### Backend (Node.js)
- **GraphQL API**: Apollo Server with Express
- **MongoDB Integration**: Mongoose ODM for data persistence
- **Track Management**: Query tracks with pagination and search
- **Auto-Seeding**: Default track added on first run
- **CORS Support**: Configured for cross-origin requests
- **Static File Serving**: Audio and asset files served from backend
- **Health Check Endpoint**: `/health` for monitoring

## 🛠️ Tech Stack

### Frontend
- React 18.2.0
- React Router v7
- Apollo Client 3.14.0 (GraphQL)
- React Three Fiber (@react-three/fiber)
- Three.js with GLTF Loader
- Lucide React (icons)

### Backend
- Node.js with Express
- Apollo Server Express
- MongoDB with Mongoose
- GraphQL
- CORS middleware

## 📋 Prerequisites

- **Node.js** v16 or higher
- **MongoDB** (local instance or MongoDB Atlas cloud)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd AI_project2
```

### 2. Backend Setup

```bash
cd backend-node
npm install
```

Create a `.env` file in `backend-node/` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/portfolio

# Server Configuration
PORT=8080
NODE_ENV=development
```

**For MongoDB Atlas** (cloud database):
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

Start the backend server:

```bash
npm start
```

✅ Backend will run on `http://localhost:8080`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/` directory:

```env
REACT_APP_API_URL=http://localhost:8080
```

Start the frontend development server:

```bash
npm start
```

✅ Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
AI_project2/
├── frontend/
│   ├── public/
│   │   ├── Assets/
│   │   │   ├── LV/              # LV logo for Netflix-style animation
│   │   │   └── Song/            # Audio files (mp3)
│   │   └── models/              # 3D GLTF models
│   ├── src/
│   │   ├── components/
│   │   │   ├── ModelViewer.js   # 3D robot rendering
│   │   │   ├── MusicPlayer.js   # Music player with integrated playlist
│   │   │   ├── LVReveal.js      # Netflix-style reveal animation
│   │   │   └── TerminalPage.js  # Terminal interface
│   │   ├── context/
│   │   │   └── MusicPlayerContext.js  # Global music state
│   │   ├── apollo/
│   │   │   └── client.js        # Apollo Client configuration
│   │   ├── graphql/
│   │   │   └── queries.js       # GraphQL queries
│   │   ├── hooks/
│   │   │   ├── useDebounce.js   # Debounce hook for search
│   │   │   └── useDraggable.js  # Drag functionality hook
│   │   ├── utils/
│   │   │   └── audioFade.js     # Audio fade in/out effects
│   │   ├── App.js               # Main app component with routing
│   │   └── index.js             # Entry point with ApolloProvider
│   └── package.json
│
├── backend-node/
│   ├── src/
│   │   ├── models/
│   │   │   └── Track.js         # Mongoose track schema
│   │   ├── graphql/
│   │   │   ├── schema.js        # GraphQL type definitions
│   │   │   └── resolvers.js     # GraphQL resolvers
│   │   ├── db.js                # MongoDB connection
│   │   ├── seed.js              # Database seeding logic
│   │   └── server.js            # Express + Apollo Server setup
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🎮 Usage

### Navigation
- **Home Page** (`/`): Interactive name with 3D robot model
- **Terminal** (`/terminal`): Terminal interface (double-click home to access)
- **Profiles** (`/profiles`): Profile selection page with music player
- **Welcome** (`/welcome`): Welcome page

### Interactions

**Home Page**:
- **Double-click anywhere**: Triggers LV Netflix-style animation → navigates to terminal
- **Click "❄️ Snow" button**: Toggle snow effect with letter accumulation
- **Hover over letters**: Subtle glow effect
- **Move mouse**: 3D robot follows cursor

**Music Player** (on `/profiles` page):
- **Space**: Play/Pause
- **Cmd/Ctrl + →**: Next track
- **Cmd/Ctrl + ←**: Previous track
- **Click track**: Play selected track
- **Search bar**: Filter tracks in real-time
- **Drag header**: Reposition player anywhere on screen
- **Shuffle button**: Toggle shuffle mode
- **Repeat button**: Cycle through OFF → ALL → ONE

## 🔧 Configuration

### Environment Variables

**Frontend** (`frontend/.env`):
```env
REACT_APP_API_URL=http://localhost:8080
```

**Backend** (`backend-node/.env`):
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=8080
NODE_ENV=development
```

### Adding Music Tracks

**Option 1: Via MongoDB directly**
1. Place audio files in `frontend/public/Assets/Song/`
2. Insert into MongoDB:

```javascript
{
  title: "Song Title",
  artist: "Artist Name",
  src: "/Assets/Song/filename.mp3",
  cover: "/Assets/covers/image.jpg",  // Optional
  durationSeconds: 240,
  tags: ["genre", "mood", "language"]
}
```

**Option 2: Via GraphQL Playground**
1. Navigate to `http://localhost:8080/graphql`
2. Use mutations (when implemented) to add tracks

## 🗄️ GraphQL API

### Queries

**Get all tracks** (with pagination and search):
```graphql
query GetTracks($limit: Int, $offset: Int, $search: String) {
  tracks(limit: $limit, offset: $offset, search: $search) {
    _id
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

**Example with variables**:
```json
{
  "limit": 20,
  "offset": 0,
  "search": "telugu"
}
```

**Get single track**:
```graphql
query GetTrack($id: ID!) {
  track(id: $id) {
    _id
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

### Endpoints

| Endpoint | Description |
|----------|-------------|
| `http://localhost:8080/graphql` | GraphQL API endpoint |
| `http://localhost:8080/health` | Health check (returns `{ status: "ok" }`) |
| `http://localhost:8080/Assets/*` | Static assets (audio, images) |

## 🎨 Customization

### Theme Colors
Edit `frontend/src/App.css`:
```css
.name {
  color: #1a1a1a; /* Text color - dark gray on black */
  -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.08); /* Subtle border */
}
```

### 3D Model Sensitivity
Edit `frontend/src/components/ModelViewer.js`:
```javascript
const targetRotationY = mouse.x * 2.5; // Increase for faster movement
const targetRotationX = -mouse.y * 1.8;
```

### Music Player Position
Edit `frontend/src/components/MusicPlayer.css`:
```css
.music-player-card {
  right: 20px;   /* Desktop horizontal position */
  bottom: 20px;  /* Desktop vertical position */
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB is running
mongod --version

# Start local MongoDB
mongod

# Or use MongoDB Atlas (cloud) - update MONGODB_URI in .env
```

### CORS Errors
- Ensure `REACT_APP_API_URL` in frontend `.env` matches backend URL
- Backend CORS is configured for `http://localhost:3000` by default
- For production, update allowed origins in `backend-node/src/server.js`

### Audio Not Playing
- ✅ Check audio files exist in `frontend/public/Assets/Song/`
- ✅ Verify track `src` paths in database start with `/Assets/`
- ✅ Open browser console and check for errors
- ✅ Verify backend is serving static files: `http://localhost:8080/Assets/Song/yourfile.mp3`

### LV Animation Not Showing
- ✅ Verify SVG exists at `frontend/public/Assets/LV/LV.svg`
- ✅ Check browser console for double-click event logs
- ✅ Try double-clicking different areas of the home page

### GraphQL Errors
```bash
# Check backend logs for detailed error messages
cd backend-node
npm start

# Verify MongoDB connection in logs
# Test GraphQL endpoint: http://localhost:8080/graphql
```

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
```
- Builds optimized production bundle to `frontend/build/`
- Assets are minified and optimized

### Backend
1. Set environment to production:
```env
NODE_ENV=production
```

2. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start src/server.js --name "portfolio-backend"
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy `build/` folder
3. Set environment variable: `REACT_APP_API_URL=https://your-backend-url.com`

### Backend (Heroku/Railway/Render)
1. Push to Git repository
2. Set environment variables:
   - `MONGODB_URI`
   - `PORT` (usually auto-set)
   - `NODE_ENV=production`
3. Deploy and get backend URL
4. Update frontend `REACT_APP_API_URL` to match

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Likhith Vardhan**

- Portfolio: [Your Portfolio URL]
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- 3D Robot Model: [Sketchfab - genkub_greeting_robot](https://sketchfab.com/)
- Icons: [Lucide React](https://lucide.dev/)
- Design Inspiration: Grok UI, Netflix animations
- Music: Telugu movie songs

## 📸 Screenshots

*Add screenshots of your portfolio here*

---

**Built with ❤️ using React, Node.js, GraphQL, and MongoDB**

*Last updated: December 2024*

