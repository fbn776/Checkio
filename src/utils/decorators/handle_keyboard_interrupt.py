import functools
from typing import Callable, Optional

def handle_keyboard_interrupt(cleanup: Optional[Callable[[], None]] = None):
    """Decorator to catch KeyboardInterrupt and run a cleanup function before exiting."""
    def decorator(func: Callable):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except KeyboardInterrupt:
                if cleanup:
                    cleanup()
        return wrapper
    return decorator