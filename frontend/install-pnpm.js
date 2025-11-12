#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up package manager...');

// Check if pnpm is available
try {
  execSync('pnpm --version', { stdio: 'ignore' });
  console.log('pnpm is available!');
  process.exit(0);
} catch (error) {
  console.log('pnpm not found, attempting to set up npm...');
}

// Remove pnpm-lock.yaml if it exists
const pnpmLockPath = path.join(__dirname, 'pnpm-lock.yaml');
if (fs.existsSync(pnpmLockPath)) {
  fs.unlinkSync(pnpmLockPath);
  console.log('Removed pnpm-lock.yaml');
}

// Try to install dependencies with npm
try {
  console.log('Installing dependencies with npm...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Building project with npm...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Setup complete!');
} catch (error) {
  console.error('Failed to set up with npm:', error.message);
  process.exit(1);
}