from rich.console import Console

from core.global_store import get_value
from core.runner.c_runner import CRunner
from core.runner.java_runner import JavaRunner
from core.runner.python_runner import PythonRunner
from utils.find_lang import find_lang
from utils.utils import get_group_and_testcase_id

runners = {
    "c": CRunner,
    "py": PythonRunner,
    "java": JavaRunner,
}

console = Console()
id_split_delimiter = get_value("id_delimiter")


def handle_run(file_name, testcase):
    group_id, testcase_id = get_group_and_testcase_id(testcase)

    if testcase is not None and (group_id is None or testcase_id is None):
        console.print("[bold red]Error:[/][red] Invalid testcase id[/]")
        console.print(f"[bold red]Usage:[/][red] [yellow]<group_id>{id_split_delimiter}<testcase_id>[/]")
        exit(1)

    file_type = find_lang(file_name)

    if file_type is None:
        console.print(f"[bold red]Error:[/][red] The file type is not supported[/]")
        exit(1)

    runner = runners.get(file_type)

    if runner is None:
        console.print(f"[bold red]Error:[/][red] The file type is not supported[/]")
        exit(1)

    # Instantiating the runner
    runner = runner(file_name=file_name)

    try:
        runner.execute(testcase_id=testcase_id, testcase_group=group_id)
    except Exception:
        console.print_exception(show_locals=True)
    finally:
        runner.cleanup()