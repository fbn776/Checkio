from rich.markdown import Markdown

def show_about():
    with open("src/docs/about.md", "r") as file:
        about = Markdown(file.read())
    return about