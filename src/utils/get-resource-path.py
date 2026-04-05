import sys
import os

def get_resource_path(relative_path):
    """
    Returns an absolute path to the resource, working for both:
      - normal (source) execution
      - frozen/bundled binaries (Nuitka, PyInstaller, etc.)
    Supply a POSIX-style relative path, e.g.:
        'config/DEFAULT_CONFIG.json' or 'checkio.db'
    """
    if getattr(sys, 'frozen', False):
        # Nuitka/onefile or PyInstaller bundle
        base_path = os.path.dirname(sys.executable)
    else:
        base_path = os.path.dirname(os.path.abspath(__file__))
    return os.path.abspath(os.path.join(base_path, relative_path))
