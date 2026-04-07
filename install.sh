#!/usr/bin/env bash
set -e

APP_NAME="checkio"
INSTALL_DIR="/opt/$APP_NAME"
APP_DIR="$INSTALL_DIR/app"
VENV_DIR="$INSTALL_DIR/.venv"

BIN_LINK="/usr/local/bin/$APP_NAME"

DATA_DIR="/var/lib/$APP_NAME"
CONFIG_DIR="/etc/$APP_NAME"

echo "==> Installing $APP_NAME..."

# Create directories
mkdir -p "$INSTALL_DIR"
mkdir -p "$DATA_DIR"
mkdir -p "$CONFIG_DIR"

# Copy current project into app directory
echo "==> Copying project..."
rm -rf "$APP_DIR"
mkdir -p "$APP_DIR"
cp -r ./* "$APP_DIR"

# Create virtual environment
echo "==> Creating virtual environment..."
uv venv "$VENV_DIR"

# Install package
echo "==> Installing package..."
uv pip install --python "$VENV_DIR/bin/python" "$APP_DIR"

# Create global executable
echo "==> Linking binary..."
ln -sf "$VENV_DIR/bin/$APP_NAME" "$BIN_LINK"

# Permissions for all users
echo "==> Setting permissions..."
chmod -R a+rX "$INSTALL_DIR"
chmod -R a+rX "$DATA_DIR"
chmod -R a+rX "$CONFIG_DIR"

echo "==> Done!"
echo "Users can now run: $APP_NAME"