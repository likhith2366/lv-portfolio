# Movies Feature - Complete Setup Guide

## 🎬 Overview

Complete movies tracking feature with:
- Node.js backend (Express + MongoDB)
- All 57 movies from your list
- Sticky navbar with LV logo
- Search, filter, and sort functionality
- Netflix-inspired UI

## 📁 Structure

```
lv_portfolio/
├── backend-node/              # Node.js backend (NEW)
│   ├── src/
│   │   ├── models/Movie.js   # Mongoose schema
│   │   ├── routes/movies.js  # API endpoints
│   │   ├── scripts/seedMovies.js  # Seed all 57 movies
│   │   └── server.js         # Express server
│   ├── .env                  # Your MongoDB URI
│   └── package.json
│
└── frontend/
    ├── public/assets/movies/  # Movie poster images (NEW)
    └── src/
        ├── components/
        │   └── OthersNavbar.js  # Sticky navbar (NEW)
        ├── pages/
        │   ├── others/
        │   │   ├── OthersLayout.js  # Layout wrapper (NEW)
        │   │   ├── MoviesPage.js    # Main movies page (NEW)
        │   │   ├── TravelPage.js    # Placeholder (NEW)
        │   │   └── FoodPage.js      # Placeholder (NEW)
        │   └── ProfilesPage.js  # Updated to link to /others
        └── App.js  # Updated with /others routing
```

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend-node
npm install
cp .env.example .env
```

Edit `.env` with your MongoDB URI:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

Seed the database:
```bash
npm run seed
```

Start backend:
```bash
npm run dev
```

### 2. Frontend

Frontend is already set up! Just make sure backend is running.

Visit: http://localhost:3000/profiles → Click "Others" → Movies

## 🎯 Features Implemented

### Backend ✅
- Express server on port 5000
- MongoDB with Mongoose
- Movie schema: title, watched, imdbRating, posterUrl, timestamps
- API routes: GET /api/movies, GET /api/movies/:id
- Seed script with all 57 movies
- Deterministic ratings (6.5-9.2 range)
- CORS enabled for frontend

### Frontend ✅
- Sticky navbar with LV logo
- Movies grid with Netflix-style cards
- Search bar (filter by title)
- Filter tabs: All / Watched / Unwatched
- Sort: Rating (desc) / Title (A-Z)
- Click card → Google search in new tab
- Loading and error states
- Responsive design
- Travel & Food placeholder pages

### Movies Data ✅
All 57 movies with correct watched status:

**Watched (27 movies):**
- American animals, Pre destination, Source code, Lubber pantu, Kishkinda kanda, Kill Bill, The art of racing in rain, Guilty, Peanut butter falcon, Anyone but you, Sookshmadarshini, Bougainvillea, The platform, Pani, Good will hunting, Inside man, Bird box, Ocean eleven, Perusu, The departed, Django unchained, No mercy for none

**Unwatched (30 movies):**
- Atypical, Marmalade, The place beyond the pines, The instigators, Primer, Volition, Caddo lake, Donnie darko, The prestige, Demolition, Kill boksoon, Incendies, The boy in the striped pyjamas, The parent trap, Baby reindeer, Blink twice, High potential, Tetris, Catholic school, A quiet place, Green book, Inglourious basterds, Casino, American wrestler, The vault, The good lie, The proposal, We were liars, Perfect couple, Running point, Monte Carlo, The others, Searching for bobby fischer

## 🖼️ Adding Movie Posters

Place PNG images in `frontend/public/assets/movies/` with filenames matching:
- `atypical.png`
- `american-animals.png`
- `the-prestige.png`
- etc. (lowercase, hyphens for spaces)

Default placeholder shows if image missing.

## 🔧 Troubleshooting

**Backend won't start:**
- Check MongoDB is running: `mongo --eval "db.stats()"`
- Verify `.env` has correct MONGODB_URI

**Frontend shows error:**
- Ensure backend is running on port 5000
- Check browser console for CORS errors

**Movies not showing:**
- Run seed script: `npm run seed`
- Check API: http://localhost:5000/api/movies

## 📝 Environment Variables

**backend-node/.env:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

**frontend/.env.local (optional):**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎨 UI Colors

- Background: #0a0a0a
- Accent: #6366f1 (Indigo)
- Watched indicator: Green checkmark
- Rating: Gold star
- Card hover: Indigo glow

## 📍 Routes

- `/profiles` → Profile selection
- `/others` → Redirects to /others/movies
- `/others/movies` → Movies page (main feature)
- `/others/travel` → Coming soon
- `/others/food` → Coming soon

