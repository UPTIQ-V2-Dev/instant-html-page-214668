#!/bin/bash

# HTML Instant - Universal Startup Script
# This script automatically detects and uses the available package manager

set -e

echo "🚀 Starting HTML Instant Application..."

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install dependencies and start
setup_and_start() {
    local pm=$1
    local install_cmd=$2
    local build_cmd=$3
    local dev_cmd=$4
    
    echo "📦 Using $pm as package manager..."
    
    # Remove conflicting lock files
    if [ "$pm" = "npm" ] && [ -f "pnpm-lock.yaml" ]; then
        echo "🧹 Removing pnpm-lock.yaml..."
        rm -f pnpm-lock.yaml
    fi
    
    if [ "$pm" = "pnpm" ] && [ -f "package-lock.json" ]; then
        echo "🧹 Removing package-lock.json..."
        rm -f package-lock.json
    fi
    
    # Install dependencies
    echo "📥 Installing dependencies..."
    $install_cmd
    
    # Build project
    echo "🏗️  Building project..."
    $build_cmd
    
    echo "✅ Setup complete!"
    echo "🎉 HTML Instant is ready!"
    echo ""
    echo "Available commands:"
    echo "  Start development: $dev_cmd"
    echo "  Build production: $build_cmd"
    echo ""
}

# Detect available package manager and use appropriate commands
if command_exists pnpm; then
    setup_and_start "pnpm" "pnpm install" "pnpm build" "pnpm dev"
elif command_exists npm; then
    setup_and_start "npm" "npm install" "npm run build" "npm run dev"
elif command_exists yarn; then
    setup_and_start "yarn" "yarn install" "yarn build" "yarn dev"
else
    echo "❌ Error: No package manager found!"
    echo "Please install one of: npm, pnpm, or yarn"
    exit 1
fi