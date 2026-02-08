#!/bin/bash

echo "🎬 Starting Movies Feature"
echo "=========================="

# Check if MongoDB is running
if ! mongosh --eval "db.stats()" > /dev/null 2>&1; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo ""
    echo "Windows: net start MongoDB"
    echo "Mac: brew services start mongodb-community"
    echo "Linux: sudo systemctl start mongod"
    exit 1
fi

echo "✅ MongoDB is running"

# Start backend
cd backend-node
echo ""
echo "🚀 Starting backend on port 5000..."
npm run dev &
BACKEND_PID=$!

echo ""
echo "✅ Backend started (PID: $BACKEND_PID)"
echo ""
echo "📡 API: http://localhost:5000/api/movies"
echo "🌐 Frontend: http://localhost:3000/others/movies"
echo ""
echo "Press Ctrl+C to stop"

wait $BACKEND_PID
