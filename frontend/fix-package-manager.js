#!/usr/bin/env node

/**
 * Fix Package Manager Script
 * This script ensures the project uses npm instead of pnpm
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing package manager configuration...');

// Remove pnpm-lock.yaml if it exists
const pnpmLockPath = path.join(process.cwd(), 'pnpm-lock.yaml');
if (fs.existsSync(pnpmLockPath)) {
  try {
    fs.unlinkSync(pnpmLockPath);
    console.log('✅ Removed pnpm-lock.yaml');
  } catch (error) {
    console.log('⚠️  Could not remove pnpm-lock.yaml:', error.message);
  }
}

// Create .nvmrc for Node.js version consistency
const nvmrcPath = path.join(process.cwd(), '.nvmrc');
if (!fs.existsSync(nvmrcPath)) {
  const nodeVersion = process.version;
  fs.writeFileSync(nvmrcPath, nodeVersion);
  console.log(`✅ Created .nvmrc with Node.js ${nodeVersion}`);
}

// Update package.json if needed
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Remove any packageManager field that might specify pnpm
    if (packageJson.packageManager) {
      delete packageJson.packageManager;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('✅ Removed packageManager field from package.json');
    }
    
    // Ensure engines specify npm
    if (!packageJson.engines) {
      packageJson.engines = {};
    }
    packageJson.engines.npm = '>=8.0.0';
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Updated package.json to use npm');
    
  } catch (error) {
    console.log('⚠️  Could not update package.json:', error.message);
  }
}

// Create npm configuration
const npmrcPath = path.join(process.cwd(), '.npmrc');
const npmrcContent = `registry=https://registry.npmjs.org/
auto-install-peers=true
prefer-offline=false
fund=false
audit=false`;

fs.writeFileSync(npmrcPath, npmrcContent);
console.log('✅ Created .npmrc configuration');

console.log('🎉 Package manager configuration fixed!');
console.log('📋 Next steps:');
console.log('   1. Run: npm install');
console.log('   2. Run: npm run build');
console.log('   3. Run: npm run dev');