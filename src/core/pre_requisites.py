from pathlib import Path

from rich.console import Console
from core.global_store import get_value

console = Console()


def __not_configured_msg():
    console.print("[bold red]Checkio is not configured, configure by running")
    console.print(":arrow_forward: [green]checkio config[/]")

def pre_requisites():
    """
    Does pre_requisite checks for the tool.
    """

    session_file = get_value("session_file")
    if session_file is None:
        __not_configured_msg()
        exit(1)

    if not Path(session_file).exists():
        __not_configured_msg()
        exit(1)