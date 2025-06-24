const { spawn } = require('child_process');
const path = require('path');

// Start backend server
const backend = spawn('npx', ['tsx', 'watch', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true
});

// Start frontend server
const frontend = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5173'], {
  stdio: 'inherit',
  shell: true
});

// Handle process cleanup
process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});

console.log('🧠 Starting BagBrain Dashboard...');
console.log('Backend: http://localhost:3000');
console.log('Frontend: http://localhost:5173');