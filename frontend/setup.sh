#!/bin/bash

# HTML Instant - Setup Script
echo "Setting up HTML Instant project..."

# Check if pnpm is available
if command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    pnpm install
    pnpm build
elif command -v npm &> /dev/null; then
    echo "pnpm not found, using npm instead..."
    # Remove pnpm-lock.yaml if it exists
    [ -f pnpm-lock.yaml ] && rm pnpm-lock.yaml
    
    # Install dependencies with npm
    npm install
    
    # Build the project
    npm run build
else
    echo "Error: Neither pnpm nor npm is available"
    exit 1
fi

echo "Setup complete!"