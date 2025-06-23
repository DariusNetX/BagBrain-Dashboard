#!/bin/bash
echo "Starting BagBrain Dashboard..."

# Start backend server
cd server
npx tsx index.ts &
BACKEND_PID=$!
echo "Backend server started (PID: $BACKEND_PID)"

# Start frontend server
cd ../client
npx vite --host 0.0.0.0 --port 5173 &
FRONTEND_PID=$!
echo "Frontend server started (PID: $FRONTEND_PID)"

# Wait for servers to start
sleep 3
echo "BagBrain Dashboard is ready!"

# Keep the script running
wait