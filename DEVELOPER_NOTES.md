# Developer Notes - MusicPlayer Project

## Environment Variable Restart Discipline

### ⚠️ CRITICAL: Restart Required After .env Changes

**Frontend (.env changes):**
- Location: `frontend/.env`
- **ALWAYS restart the Vite dev server** after changing `.env`
- Changes include: `REACT_APP_API_URL` or any `REACT_APP_*` variable

```bash
# Stop the frontend (Ctrl+C)
# Then restart:
cd frontend
npm start
```

**Backend (.env changes):**
- Location: `backend-node/.env`
- **ALWAYS restart the Node server** after changing `.env`
- Changes include: `MONGODB_URI`, `PORT`, `NODE_ENV`

```bash
# Stop the backend (Ctrl+C)
# Then restart:
cd backend-node
npm run dev
```

### Why Restarts Are Required

- **React/Vite**: Environment variables are bundled at build time, not runtime
- **Node.js**: `dotenv` reads `.env` only once during initial module load
- **No Hot Reload**: Changes to `.env` files are NOT picked up automatically

## Startup Verification

### Backend Logs (Expected on Start)

```
=== Environment Configuration ===
NODE_ENV: development
PORT: 8080 (default)
MONGODB_URI: [SET]
================================

✓ MongoDB connected successfully
  Database: lvdb
✓ GraphQL mounted at /graphql
Server running on http://localhost:8080
GraphQL endpoint: http://localhost:8080/graphql
Environment: development
```

### Frontend Logs (Expected on Start)

```
=== Apollo Client Configuration ===
GraphQL URI: http://localhost:8080/graphql
REACT_APP_API_URL: http://localhost:8080
NODE_ENV: development
====================================
```

### What to Check If Logs Don't Match

1. **Backend shows `MONGODB_URI: [NOT SET]`**
   - Create `backend-node/.env` file
   - Add: `MONGODB_URI=mongodb://localhost:27017/lvdb`
   - Restart backend server

2. **Frontend shows `REACT_APP_API_URL: undefined`**
   - Create `frontend/.env` file
   - Add: `REACT_APP_API_URL=http://localhost:8080`
   - Restart frontend server

3. **GraphQL URI points to wrong port**
   - Verify `REACT_APP_API_URL` in `frontend/.env`
   - Ensure backend is running on expected port
   - Restart both servers

## Debugging Connection Issues

### Test Backend Health

```bash
# Test if backend is reachable
curl http://localhost:8080/health

# Expected response:
# {
#   "status": "ok",
#   "message": "Server is running",
#   "mongodb": "connected",
#   "timestamp": "2025-12-26T..."
# }
```

### Test GraphQL Endpoint

```bash
# Test GraphQL query
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ tracks { id title artist } }"}'
```

### Common Errors

**Error: "Failed to fetch"**
- Cause: Backend not running or CORS issue
- Fix: Start backend with `npm run dev`
- Verify: Check backend logs for CORS configuration

**Error: "Unable to load playlist"**
- Cause: GraphQL query failed
- Fix: Open browser console, check for detailed error
- Verify: Test `/health` endpoint

**Error: "REACT_APP_API_URL is not defined"**
- Cause: Frontend `.env` not loaded or missing
- Fix: Create/verify `frontend/.env` with `REACT_APP_API_URL=http://localhost:8080`
- **IMPORTANT**: Restart Vite dev server

**Error: "MONGODB_URI environment variable is not set"**
- Cause: Backend `.env` not loaded or missing
- Fix: Create/verify `backend-node/.env` with `MONGODB_URI=mongodb://localhost:27017/lvdb`
- **IMPORTANT**: Restart Node server

## Development Workflow

### Starting from Scratch

1. **Start MongoDB** (if not already running)
   ```bash
   # macOS/Linux with brew
   brew services start mongodb-community

   # Windows
   net start MongoDB
   ```

2. **Start Backend**
   ```bash
   cd backend-node
   npm run dev
   ```
   - Wait for: `✓ MongoDB connected successfully`
   - Wait for: `✓ GraphQL mounted at /graphql`

3. **Start Frontend** (in new terminal)
   ```bash
   cd frontend
   npm start
   ```
   - Wait for: Apollo Client Configuration logs
   - Browser opens at `http://localhost:3000`

4. **Verify Connection**
   - Navigate to `/profiles` page
   - Click chevron icon to expand music player playlist
   - Should see tracks loading (or "No tracks found" if empty)
   - Check browser console for errors

### Making Changes

**Code Changes:**
- Frontend: Hot reload works automatically
- Backend: Auto-restart with nodemon (if configured)

**Environment Changes:**
- Frontend `.env`: **MUST RESTART** Vite
- Backend `.env`: **MUST RESTART** Node
- No exceptions - always restart after `.env` changes

## Environment File Templates

### `backend-node/.env`
```env
MONGODB_URI=mongodb://localhost:27017/lvdb
PORT=8080
NODE_ENV=development
```

### `frontend/.env`
```env
REACT_APP_API_URL=http://localhost:8080
```

## Troubleshooting Checklist

- [ ] MongoDB is running
- [ ] Backend `.env` exists with `MONGODB_URI`
- [ ] Backend server started successfully
- [ ] Backend logs show GraphQL mounted at `/graphql`
- [ ] Frontend `.env` exists with `REACT_APP_API_URL`
- [ ] Frontend server started successfully
- [ ] Frontend logs show correct GraphQL URI
- [ ] `/health` endpoint returns 200 OK
- [ ] Browser console shows no CORS errors
- [ ] Network tab shows GraphQL requests to correct URL

## Quick Reference

| Issue | Solution |
|-------|----------|
| "Failed to fetch" | Start backend server |
| "REACT_APP_API_URL not defined" | Create `frontend/.env`, restart Vite |
| "MONGODB_URI not set" | Create `backend-node/.env`, restart Node |
| CORS error | Check backend CORS config, ensure correct origin |
| No tracks loading | Check backend logs, verify MongoDB connection |
| 404 on /graphql | Verify backend started, check server logs |

---

**Last Updated:** December 26, 2025
