from rich.panel import Panel
from rich.text import Text


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