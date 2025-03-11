import os
from rich.panel import Panel
from rich.text import Text

from core.global_store import get_value


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


id_split_delimiter = get_value("id_delimiter")


def get_group_and_testcase_id(ids: str | None) -> tuple[None, None] | list[str]:
    """
    Splits the ids by id_split_delimiter;
    This essentially splits the group_id and testcase_id from a string of the format <group_id><id_split_delimiter><testcase_id>
    """
    if ids is None:
        return None, None

    if id_split_delimiter in ids:
        return ids.split(id_split_delimiter)

    return None, None
