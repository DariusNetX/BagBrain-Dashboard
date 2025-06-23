#!/bin/bash

# Start backend server
cd server && npx tsx index.ts &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Start frontend server
cd client && npx vite --host 0.0.0.0 --port 5173 &
FRONTEND_PID=$!

# Function to cleanup processes
cleanup() {
    echo "Shutting down BagBrain Dashboard..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

echo "🧠 BagBrain Dashboard started!"
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:5173"

# Wait for processes
wait