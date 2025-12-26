# Testing Guide - MusicPlayer Integration

## ✅ Issue Fixed

**Problem:** Apollo Client 4.x doesn't include React hooks in the main export.
**Solution:** Downgraded to `@apollo/client@3.14.0` which includes `useQuery`, `ApolloProvider`, and all React hooks.

## 🚀 Quick Start

### 1. Start MongoDB (if not running)
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 2. Start Backend (Node.js)
```bash
cd backend-node
npm run dev
```

Expected output:
```
Server running on http://localhost:8080
GraphQL endpoint: http://localhost:8080/graphql
Environment: development
```

### 3. Start Frontend
```bash
cd frontend
npm start
```

The app will open at `http://localhost:3000`

## 🧪 Testing Checklist

### Basic Functionality
- [ ] **Page Load**: MusicPlayer appears in bottom-right corner
- [ ] **Tracks Load**: Check browser console - should see GraphQL request
- [ ] **First Track**: Default track should load automatically
- [ ] **Play Button**: Click play - audio should start with fade-in
- [ ] **Volume**: Adjust volume slider - should work smoothly

### Playlist Panel
- [ ] **Open Playlist**: Click list icon (📋) in player header
- [ ] **Panel Appears**: Separate draggable panel shows on right
- [ ] **Track List**: All tracks from database displayed
- [ ] **Current Track**: Currently playing track is highlighted (green)
- [ ] **Click Track**: Click different track - should switch playback
- [ ] **Search**: Type in search box - tracks filter in real-time
- [ ] **Clear Search**: Click X button - search clears

### Navigation Controls
- [ ] **Next Track**: Click ⏭️ button - moves to next track
- [ ] **Previous Track**: Click ⏮️ button - moves to previous track
- [ ] **Progress Bar**: Click anywhere on bar - seeks to that position
- [ ] **Track Info**: Title and artist update when track changes

### Shuffle & Repeat
- [ ] **Shuffle ON**: Click 🔀 icon - turns green, toast shows "Shuffle: ON"
- [ ] **Shuffle Play**: Next track is random
- [ ] **Repeat Cycle**: Click 🔁 icon multiple times
  - First click: "Repeat: ALL" (green)
  - Second click: "Repeat: ONE" (shows 🔁1)
  - Third click: "Repeat: OFF" (gray)
- [ ] **Repeat ALL**: At last track, clicking next goes to first track
- [ ] **Repeat ONE**: Track replays when it ends

### Dragging
- [ ] **Player Drag**: Click and drag player header - moves with cursor
- [ ] **Grabbing Cursor**: Cursor changes to grabbing while dragging
- [ ] **Viewport Constraint**: Can't drag outside screen edges (16px margin)
- [ ] **Playlist Drag**: Drag playlist panel header independently
- [ ] **Position Persists**: Refresh page - positions are restored

### Keyboard Shortcuts
- [ ] **Spacebar**: Press Space - toggles play/pause
- [ ] **Cmd/Ctrl + →**: Next track
- [ ] **Cmd/Ctrl + ←**: Previous track
- [ ] **Input Focus**: Shortcuts don't trigger when typing in search

### Toast Notifications
- [ ] **Track Change**: Toast shows "Playing: [Track Name]"
- [ ] **Mode Change**: Toast shows when toggling shuffle/repeat
- [ ] **Auto-Hide**: Toast disappears after 1.5 seconds
- [ ] **Animation**: Smooth slide-in and fade-out

### Audio Fading
- [ ] **Fade In**: Audio gradually increases when playing
- [ ] **Fade Out**: Audio gradually decreases when pausing
- [ ] **Smooth Transitions**: No abrupt starts/stops

### Persistence
- [ ] **Refresh Test**: Play a track, refresh page
  - [ ] Last track ID restored
  - [ ] Volume level preserved
  - [ ] Shuffle/repeat modes preserved
  - [ ] Player position preserved
  - [ ] Playlist visibility preserved

### Global Behavior
- [ ] **Navigate to /terminal**: Player continues playing
- [ ] **Navigate to /welcome**: Player still visible and playing
- [ ] **Navigate to /profiles**: Player still visible and playing
- [ ] **Back to /**: Player maintains state

### Error Handling
- [ ] **No Backend**: Stop backend - player shows "No tracks found"
- [ ] **Empty Search**: Search for gibberish - shows "No tracks found"
- [ ] **Network Error**: Check console for graceful error messages

## 🐛 Common Issues

### 1. "No tracks found"
**Cause**: Backend not running or MongoDB not accessible
**Fix**:
```bash
# Check backend is running
cd backend-node
npm run dev

# Check MongoDB is running
mongosh  # Should connect successfully
```

### 2. Audio doesn't play
**Cause**: Audio file path incorrect
**Fix**: Check that audio files exist in `backend-node/public/Assets/Song/`

### 3. Player doesn't appear
**Cause**: JavaScript error
**Fix**: Open browser DevTools (F12) and check Console for errors

### 4. GraphQL errors
**Cause**: Backend not responding
**Fix**:
```bash
# Test GraphQL endpoint
curl http://localhost:8080/graphql
# or visit http://localhost:8080/graphql in browser
```

### 5. Dragging doesn't work
**Cause**: Must drag from header area specifically
**Fix**: Click and drag the "Now playing" text or playlist header text

## 🎯 Advanced Testing

### Performance
- [ ] **Smooth Dragging**: No lag when dragging
- [ ] **Search Performance**: Debounce works (waits 300ms)
- [ ] **Large Playlist**: Add 50+ tracks - scrolling is smooth
- [ ] **Memory**: Player doesn't leak memory on route changes

### Edge Cases
- [ ] **Single Track**: Only one track in database - prev/next handled
- [ ] **Empty Database**: No tracks - shows appropriate message
- [ ] **Long Track Names**: Very long title/artist - ellipsis works
- [ ] **Special Characters**: Track with emoji/unicode - displays correctly

### Browser Compatibility
- [ ] **Chrome**: All features work
- [ ] **Firefox**: All features work
- [ ] **Safari**: All features work
- [ ] **Edge**: All features work

## 📊 Expected Behavior

### First Load
1. Player appears in bottom-right
2. Fetches tracks from GraphQL
3. Loads first track (or last played track)
4. Ready to play (paused state)

### Playing a Track
1. Click play button
2. Audio fades in over 200ms
3. Progress bar updates smoothly
4. Toast notification appears
5. Track info displays correctly

### Switching Tracks
1. Click track in playlist
2. Current audio fades out
3. New track loads
4. New audio fades in
5. Playlist scrolls to new track
6. Current track highlight moves

## 🎉 Success Criteria

All checkboxes above should be checked for a successful implementation!

---

**Last Updated**: December 26, 2025
**Status**: Ready for Testing
