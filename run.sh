#!/bin/bash

# Kill any existing processes
pkill -f "tsx\|vite" 2>/dev/null || true
sleep 1

echo "Starting BagBrain Dashboard servers..."

# Start backend server
cd server
npx tsx index.ts &
echo "Backend server starting on port 3000"

# Start frontend server  
cd ../client
npx vite --host 0.0.0.0 --port 5173