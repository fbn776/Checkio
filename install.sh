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

mkdir -p "$INSTALL_DIR" "$DATA_DIR" "$CONFIG_DIR"

echo "==> Copying project..."
rm -rf "$APP_DIR"
mkdir -p "$APP_DIR"
cp -r . "$APP_DIR"

echo "==> Recreating venv using system python..."
rm -rf "$VENV_DIR"
python3 -m venv "$VENV_DIR"

echo "==> Installing package..."
"$VENV_DIR/bin/pip" install --upgrade pip
"$VENV_DIR/bin/pip" install "$APP_DIR"

echo "==> Linking binary..."
ln -sf "$VENV_DIR/bin/$APP_NAME" "$BIN_LINK"

echo "==> Setting permissions..."
chmod -R a+rX "$INSTALL_DIR"
chmod -R a+rX "$DATA_DIR"
chmod -R a+rX "$CONFIG_DIR"

echo "==> Done!"