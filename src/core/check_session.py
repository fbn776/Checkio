from pathlib import Path

from core.global_store import get_value


def is_first_session():
    """
    Check if the session is valid, ie is this the first time the user is using the tool
    """
    session_file = get_value("session_file")

    if session_file is None:
        return True

    if Path(session_file).exists():
        return False

    return True
