import json

from rich.console import Console

from core.db.testcases import get_testcase_by_id
from utils.utils import get_group_and_testcase_id

console = Console()

temp = {'_id': 1, 'group_id': 'OS', 'id': '1', 'title': 'Add two numbers',
        'description': 'Add two numbers a and b, then print the results to the screen.',
        'data': '[{"hidden": false, "cli_args": [], "files": [], "input": "5 5", "output": "10"}, {"hidden": false, "cli_args": [], "files": [], "input": "10 6", "output": "16"}]',
        'created_at': "na"}


def handle_view(testcase_id):
    try:
        group_id, testcase_id = get_group_and_testcase_id(testcase_id)

        data = get_testcase_by_id(group_id=group_id, t_id=testcase_id)
        console.print(f"[bold yellow underline]{data['title']}[/]")

        from rich.console import Console
        from rich.markdown import Markdown

        md = Markdown(data['description'])
        console.print(md)
        print()
        console.print(f"[bold green]Testcase ID: [/][red]{data['group_id']}-{data['id']}[/]")
        console.print(f"[bold green]Testcases: [/][red]{len(json.loads(data['data']))}")
    except Exception as e:
        console.print("[bold red]Invalid Testcase[/]")
