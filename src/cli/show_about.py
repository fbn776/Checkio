from rich.markdown import Markdown

def show_about():
    about = Markdown(
        """
        # About

        This is a simple CLI application that demonstrates the use of the Rich library to create a rich text user interface.
        """
    )
    return about