const { spawn } = require('child_process');

// Start backend server
console.log('🧠 Starting BagBrain Dashboard Backend...');
const backend = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true
});

// Start frontend after a short delay
setTimeout(() => {
  console.log('🧠 Starting BagBrain Dashboard Frontend...');
  const frontend = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5173'], {
    cwd: 'client',
    stdio: 'inherit',
    shell: true
  });

  // Handle frontend errors
  frontend.on('error', (err) => {
    console.error('Frontend error:', err);
  });
}, 2000);

// Handle backend errors
backend.on('error', (err) => {
  console.error('Backend error:', err);
});

console.log('BagBrain Dashboard starting...');
console.log('Backend will be available at: http://localhost:3000');
console.log('Frontend will be available at: http://localhost:5173');