import getpass
import json

from core.db.db import get_db
from core.db.models.Submission import Submission
from core.db.models.Testcase import Testcase
# from core.db.models.Submission import Submission, SubmittedFiles
from core.global_store import get_value
from utils.utils import get_group_and_testcase_id
from rich.console import Console

console = Console()
id_split_delimiter = get_value("id_delimiter")


def handle_submit(values, testcase):
    group_id, testcase_id = get_group_and_testcase_id(testcase)

    if testcase is None or group_id is None or testcase_id is None:
        console.print("[bold red]Error:[/][red] Invalid testcase id[/]")
        console.print(f"[bold red]Usage:[/][red] [yellow]<group_id>{id_split_delimiter}<testcase_id>[/]")
        exit(1)

    db = next(get_db())
    testcase = db.query(Testcase).filter_by(id=testcase_id, group_id=group_id).first()

    if testcase is None:
        console.print("[bold red]Error:[/][red] Testcase not found[/]")
        exit(1)

    file_objects = []

    for value in values:
        try:
            with open(value, "r") as file:
                content = file.read()
                file_objects.append({
                    "name": file.name,
                    "content": content
                })
        except FileNotFoundError:
            console.print(f"[bold red]Warning:[/] File '{value}' not found. Skipping...")
            exit(1)

    db = next(get_db())
    submission = Submission(group_id=group_id, testcase_id=testcase.main_id, submitted_by=getpass.getuser(),
                            submitted_files=json.dumps(file_objects))

    db.add(submission)
    db.commit()

    console.print("[bold green]Submission successful![/]")
