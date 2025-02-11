from rich.console import Console
from rich.markdown import Markdown

console = Console()

def handle_about():
    with open("src/../docs/about.md", "r", encoding="utf-8") as file:
        about = Markdown(file.read())

    console.print(about, justify="left")