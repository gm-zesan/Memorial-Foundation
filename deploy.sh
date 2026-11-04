#!/usr/bin/env bash
# ==============================================================================
# Mashiur Rahman Memorial Foundation - Deployment Script
# Usage:
#   ./deploy.sh
#   OR
#   ./deploy.sh /path/to/LightsailDefaultKey-ap-south-1.pem
# ==============================================================================
set -euo pipefail

SERVER_IP="13.203.173.126"
SERVER_USER="ubuntu"
REMOTE_DIR="/var/www/mashiurrahman"
DEFAULT_KEY="LightsailDefaultKey-ap-south-1.pem"

# 1. Detect SSH Key
KEY_PATH="${1:-$DEFAULT_KEY}"

if [ ! -f "$KEY_PATH" ]; then
  if [ -f "$HOME/$DEFAULT_KEY" ]; then
    KEY_PATH="$HOME/$DEFAULT_KEY"
  elif [ -f "$HOME/Desktop/$DEFAULT_KEY" ]; then
    KEY_PATH="$HOME/Desktop/$DEFAULT_KEY"
  elif [ -f "$HOME/Downloads/$DEFAULT_KEY" ]; then
    KEY_PATH="$HOME/Downloads/$DEFAULT_KEY"
  elif [ -f "/tmp/lightsail_key.pem" ]; then
    KEY_PATH="/tmp/lightsail_key.pem"
  else
    echo "❌ SSH Key file not found!"
    echo "Usage: ./deploy.sh [path/to/key.pem]"
    echo "Example: ./deploy.sh ~/LightsailDefaultKey-ap-south-1.pem"
    exit 1
  fi
fi

chmod 400 "$KEY_PATH" 2>/dev/null || true

echo "=========================================================="
echo "🚀 Deploying to: https://mashiurrahman.org"
echo "🌐 Server: $SERVER_USER@$SERVER_IP"
echo "📁 Destination: $REMOTE_DIR"
echo "🔑 Key: $KEY_PATH"
echo "=========================================================="

# 2. Upload files to /tmp staging directory
echo "📦 Uploading files via rsync..."
rsync -avz --delete \
  --exclude ".git" \
  --exclude ".gitignore" \
  --exclude "deploy.sh" \
  --exclude "*.pem" \
  --exclude ".DS_Store" \
  -e "ssh -i $KEY_PATH -o StrictHostKeyChecking=no" \
  ./ "$SERVER_USER@$SERVER_IP:/tmp/mashiurrahman_deploy/"

# 3. Move files to production folder and set permissions
echo "🔧 Deploying to $REMOTE_DIR and updating permissions..."
ssh -i "$KEY_PATH" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" bash -s << 'EOF'
  sudo mkdir -p /var/www/mashiurrahman
  sudo cp -r /tmp/mashiurrahman_deploy/* /var/www/mashiurrahman/
  sudo chown -R www-data:www-data /var/www/mashiurrahman
  sudo find /var/www/mashiurrahman -type d -exec chmod 755 {} +
  sudo find /var/www/mashiurrahman -type f -exec chmod 644 {} +
  sudo rm -rf /tmp/mashiurrahman_deploy
  sudo nginx -t && sudo systemctl reload nginx
EOF

echo ""
echo "=========================================================="
echo "✅ Deployment finished successfully!"
echo "🌍 Visit: https://mashiurrahman.org"
echo "=========================================================="
