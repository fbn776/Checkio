from rich.console import Console
from rich.markdown import Markdown

def handle_about():
    with open("src/docs/about.md", "r") as file:
        about = Markdown(file.read())

    console = Console()
    console.print(about)