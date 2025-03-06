from pathlib import Path

from rich.console import Console

from core.check_session import is_first_session
from core.global_store import get_value

console = Console()


def __not_configured_msg():
    console.print("[bold red]Checkio is not configured, configure by running")
    console.print(":arrow_forward: [green]checkio config[/]")

def pre_requisites():
    """
    Does pre_requisite checks for the tool.
    """

    if is_first_session():
        __not_configured_msg()
        exit(1)
