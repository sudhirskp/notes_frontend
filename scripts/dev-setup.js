#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Notes App Frontend...\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  console.log('Run: npm install');
  console.log('');
}

console.log('✅ Project setup complete!');
console.log('');
console.log('Next steps:');
console.log('1. Install dependencies: npm install');
console.log('2. Start development server: npm run dev');
console.log('3. Make sure your backend API is running on http://localhost:8080');
console.log('');
console.log('The app will be available at http://localhost:3000');
