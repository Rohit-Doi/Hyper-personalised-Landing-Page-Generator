#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying project setup...\n');

// Check if package.json exists
const packageJsonPath = path.join(__dirname, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ package.json not found');
  process.exit(1);
}

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Check if firebase is in dependencies
if (!packageJson.dependencies || !packageJson.dependencies.firebase) {
  console.error('❌ Firebase dependency not found in package.json');
  console.log('💡 Run: npm install firebase');
  process.exit(1);
}

console.log('✅ Firebase dependency found in package.json');
console.log('✅ Project setup looks good!');
console.log('\n📝 Next steps:');
console.log('1. Run: npm install');
console.log('2. Create .env.local with your Firebase credentials');
console.log('3. Run: npm run dev'); 