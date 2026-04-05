import os
from pathlib import Path
from rich.panel import Panel
from rich.text import Text

from utils.project_root import PROJECT_ROOT

DEFAULT_STORAGE_ROOT = Path("/var/tmp/checkio")


def boxed_text(console, title, text, style, border_style, expand=False):
    # Creates a panel (a box) and enclose the error message to the box;
    console.print(
        Panel(
            text,
            title=Text(title, style=style),
            border_style=border_style,
            expand=expand
        )
    )
    return


def is_superuser():
    """Check if the user is a root user or not"""
    return os.geteuid() == 0


id_split_delimiter = "-"


def get_group_and_testcase_id(ids: str | None) -> tuple[None, None] | list[str]:
    """
    Splits the ids by id_split_delimiter;
    This essentially splits the group_id and testcase_id from a string of the format <group_id><id_split_delimiter><testcase_id>
    """
    if ids is None:
        return None, None

    delimiter = id_split_delimiter
    if isinstance(delimiter, str) and delimiter in ids:
        return ids.split(delimiter)

    return None, None


ERROR_MAP = {
    # General Errors
    1: "Invalid input",
    2: "File not found",
    3: "Permission denied",
    4: "Operation timeout",
    5: "Connection failed",

    # System Errors (Based on errno)
    -1: "Operation not permitted",
    -2: "No such file or directory",
    -3: "No such process",
    -4: "Interrupted system call",
    -5: "Input/output error",
    -6: "No such device or address",
    -7: "Argument list too long",
    -8: "Exec format error",
    -9: "Bad file descriptor",
    -10: "No child processes",
    -11: "Resource temporarily unavailable",
    -12: "Out of memory",
    -13: "Permission denied",
    -14: "Bad address",
    -15: "Block device required",
    -16: "Device or resource busy",
    -17: "File exists",
    -18: "Invalid cross-device link",
    -19: "No such device",
    -20: "Not a directory",
    -21: "Is a directory",
    -22: "Invalid argument",
    -23: "Too many open files in system",
    -24: "Too many open files",
    -25: "Inappropriate ioctl for device",
    -26: "Text file busy",
    -27: "File too large",
    -28: "No space left on device",
    -29: "Illegal seek",
    -30: "Read-only file system",

    # Network Errors
    -40: "Network down",
    -41: "Network unreachable",
    -42: "Connection reset by peer",
    -43: "Host unreachable",
    -44: "Protocol error",
    -45: "Address already in use",
    -46: "Broken pipe",

    # Database Errors
    -60: "Database connection failed",
    -61: "Query syntax error",
    -62: "Record not found",
    -63: "Transaction failed",

    # Authentication Errors
    -70: "User not authenticated",
    -71: "Invalid credentials",
    -72: "Account locked",
    -73: "Session expired",

    # Application-Specific Errors
    -80: "Feature not implemented",
    -81: "Unsupported operation",
    -82: "Data integrity violation",

    # Unknown Errors
    -100: "Unknown error",
    -101: "Unexpected system failure",
    -102: "Service unavailable",
    -103: "Internal server error",
}

def get_error_message(code):
    """Returns the error message for a given code."""
    return ERROR_MAP.get(code, "Unrecognized error code")


import sys


def get_storage_root(create: bool = False) -> Path:
    """Return the persistent data directory (defaults to /var/tmp/checkio)."""
    storage_root = DEFAULT_STORAGE_ROOT.expanduser()
    if create:
        storage_root.mkdir(parents=True, exist_ok=True)
    return storage_root


def get_storage_path(*parts: str, create_parent: bool = False) -> Path:
    """Build a path inside the persistent storage directory."""
    storage_path = get_storage_root(create=create_parent)
    for part in parts:
        storage_path = storage_path / part
    if create_parent:
        storage_path.parent.mkdir(parents=True, exist_ok=True)
    return storage_path


def get_resource_path(relative_path):
    """
    Returns an absolute path to the resource, working for both:
      - normal (source) execution
      - frozen/bundled binaries (Nuitka, PyInstaller, etc.)
    Supply a POSIX-style relative path, e.g.:
        'config/DEFAULT_CONFIG.json' or 'checkio.db'
    """
    if getattr(sys, 'frozen', False):
        base_path = Path(sys.executable).resolve().parent
    else:
        base_path = Path(PROJECT_ROOT).resolve().parent
    return str((base_path / relative_path).resolve())
