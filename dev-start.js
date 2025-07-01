// Development server startup script
const { spawn } = require('child_process');

console.log('🚀 Starting BagBrain Dashboard development server...');

const devProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

devProcess.on('error', (error) => {
  console.error('❌ Failed to start development server:', error);
  process.exit(1);
});

devProcess.on('close', (code) => {
  console.log(`Development server exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development server...');
  devProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down development server...');
  devProcess.kill('SIGTERM');
});