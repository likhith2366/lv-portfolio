# MongoDB Atlas Setup Guide

## Step 1: Get Your MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in to your account
3. Click on "Connect" button for your cluster
4. Choose "Connect your application"
5. Copy the connection string (looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 2: Update Your .env File

Replace the current MONGODB_URI in your `.env` file with your Atlas connection string:

**Important:** Replace `<username>` and `<password>` with your actual database credentials!

```env
PORT=5000
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

Notice we added `/portfolio` before the `?` - this sets the database name.

## Step 3: Whitelist Your IP Address

1. In MongoDB Atlas dashboard, go to "Network Access"
2. Click "Add IP Address"
3. Either:
   - Click "Add Current IP Address" (recommended for development)
   - Or click "Allow Access from Anywhere" (0.0.0.0/0) for testing

## Step 4: Install Dependencies (if not done)

```bash
cd backend-node
npm install
```

## Step 5: Seed the Database

Run the seed script to add all 57 movies:

```bash
npm run seed
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing movies
✅ Seeded 57 movies successfully!
```

## Step 6: Start the Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
📡 API endpoint: http://localhost:5000/api/movies
✅ MongoDB connected successfully
```

## Step 7: Verify Everything Works

1. Open http://localhost:5000/api/health in your browser
2. You should see: `{"status":"Server is running","mongodb":"connected"}`
3. Open http://localhost:5000/api/movies
4. You should see all 57 movies in JSON format

## Troubleshooting

**"Authentication failed" error:**
- Double-check your username and password in the connection string
- Make sure you're using the database user credentials (not your Atlas account password)

**"Connection timeout" error:**
- Check if your IP address is whitelisted in Network Access
- Try allowing access from anywhere (0.0.0.0/0) temporarily

**"Cannot connect" error:**
- Verify your connection string is correct
- Make sure you added `/portfolio` database name before the `?`
- Check if MongoDB Atlas cluster is running (not paused)

## Quick Commands Reference

```bash
# Install dependencies
cd backend-node
npm install

# Seed database
npm run seed

# Start server (development mode with auto-reload)
npm run dev

# Start server (production mode)
npm start
```
