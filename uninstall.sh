#!/usr/bin/env bash
set -e

APP_NAME="checkio"

INSTALL_DIR="/opt/$APP_NAME"
BIN_LINK="/usr/local/bin/$APP_NAME"
DATA_DIR="/var/tmp/$APP_NAME"
CONFIG_DIR="/etc/$APP_NAME"

echo "==> Uninstalling $APP_NAME..."

# Remove binary symlink
if [ -L "$BIN_LINK" ] || [ -f "$BIN_LINK" ]; then
    echo "==> Removing binary link..."
    rm -f "$BIN_LINK"
fi

# Remove install directory
if [ -d "$INSTALL_DIR" ]; then
    echo "==> Removing installation directory..."
    rm -rf "$INSTALL_DIR"
fi

# Remove shared data
if [ -d "$DATA_DIR" ]; then
    echo "==> Removing shared data..."
    rm -rf "$DATA_DIR"
fi

# Remove shared config
if [ -d "$CONFIG_DIR" ]; then
    echo "==> Removing shared config..."
    rm -rf "$CONFIG_DIR"
fi

echo "==> $APP_NAME has been completely removed."