from rich.console import Console
from core.runner.base_runner import BaseRunner
from core.runner.c_runner import CRunner
from utils.find_lang import find_lang

runners = {
    "c": CRunner,
    "py": BaseRunner,
    "java": BaseRunner
}

console = Console()

def handle_run(file_name, testcase):
    file_type = find_lang(file_name)

    if file_type is None:
        console.print(f"[bold red]Error:[/][red] The file type is not supported[/]")
        exit(1)

    runner = runners.get(file_type)

    if runner is None:
        console.print(f"[bold red]Error:[/][red] The file type is not supported[/]")
        exit(1)

    # Instantiating the runner
    runner = runner()

    try:
        runner.execute(file_name, testcase)
    except KeyboardInterrupt:
        runner.cleanup()
        console.print("\n[bold red]Keyboard interrupt[/]")
