import json

from rich.console import Console
from cli.ui.create_testcase_screen import CreateTestcaseScreen
from rich.markdown import Markdown
from rich.table import Table

from core.db.testcases import create_testcase

console = Console()


def display_testcase(name: str, description: str, visible: int, hidden: int):
    # Display formatted title
    console.print(f"[bold green]Test Case Created![/bold green]")

    # Display name
    console.print(f"[bold yellow]Name:[/bold yellow] {name}")

    if description:
        # Display description in Markdown
        console.print("[bold yellow]Description:[/bold yellow]")
        console.print(Markdown(description))

    # Display details in a table
    console.print("\n[bold yellow]Details:[/bold yellow]")
    table = Table(show_header=True, header_style="bold cyan")
    table.add_column("Field", style="bold magenta")
    table.add_column("Value", style="bold white")

    table.add_row("Total Test Cases", str(visible + hidden))
    table.add_row("Visible Test Cases", str(visible))
    table.add_row("Hidden Test Cases", str(hidden))

    console.print(table)


def handle_create(passed_name):
    result = CreateTestcaseScreen(passed_name).run()

    if result is None:
        console.print("[bold red]Aborted![/bold red]")
        return

    # print(result)

    # result = {'name': 'gvhjkl;', 'description': "hjkl;'", 'testcases': [{'title': 'Testcase 1', 'hidden': False, 'input': 'hgijkl;.', 'output': 'huijokl;,   '}]}

    display_testcase(result["name"], result["description"], len(result["testcases"]),
                     len([tc for tc in result["testcases"] if tc["hidden"]]))

    create_testcase(result["name"], result["description"], json.dumps(result))
