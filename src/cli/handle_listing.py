from core.db.testcases import get_testcases
from rich.console import Console, Group

console = Console()


def handle_listing():
    testcases = get_testcases()

    i = 1
    console.print("[bold underline green]Test Cases:[/]")
    for item in testcases:
        console.print(f"{i} | [bold yellow] {item['title']}[/] - [black on green]{item['group_id']}-{item['id']}")

        i += 1
