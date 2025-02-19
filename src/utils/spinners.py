from rich.console import Console
from rich.spinner import Spinner
import time
from contextlib import contextmanager


@contextmanager
def spinner_context(console: Console, text: str, spinner_style: str = 'dots'):
    """
    Create a context manager for spinner operations

    Args:
        console: Rich console instance
        text: Text to display alongside spinner
        spinner_style: Style of spinner ('dots', 'line', 'arrow', etc.)

    Usage:
        with spinner_context(console, "Processing...") as status:
            status.update("Loading data...")
            long_running_operation()
            status.update("Processing information...")
            long_running_operation()
            status.update("Finalizing...")
            long_running_operation
    """
    with console.status(text, spinner=spinner_style) as status:
        try:
            yield status
        except Exception as e:
            console.print(f"[bold red]Operation failed: {str(e)}")
            raise