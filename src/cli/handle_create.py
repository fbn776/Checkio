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


temp = {'group_id': 'OS',
        'name': 'Hello',
        'id': '1',
        'description': 'hkjhedbhdbnmb',
        'testcases': [{'title': 'Testcase 1', 'hidden': False, 'input': '10 10', 'output': '30'}]}


def handle_create(passed_name):
    result = CreateTestcaseScreen(passed_name).run()
    if result is None:
        console.print("[bold red]Aborted![/bold red]")
        return
    try:
        create_testcase(
            testcase_id=result["id"],
            group_id=result["group_id"],
            title=result["name"],
            description=result["description"],
            body=[{"hidden": item["hidden"], "input": item["input"], "output": item["output"]} for item in
                  result["testcases"]]
        )

        console.print("[bold green]Test Case Created![/bold green]")

    except Exception as e:
        console.print("""[bold red]An error occurred while creating the testcase![/bold red]
Possible causes:
- Testcase ID already exists
- Group ID doesn't exist
        """)
        # console.print_exception(show_locals=True)
        return

    print(result)
