from rich.console import Console
from core.runner.c_runner import CRunner
from core.runner.java_runner import JavaRunner
from core.runner.python_runner import PythonRunner
from utils.find_lang import find_lang

runners = {
    "c": CRunner,
    "py": PythonRunner,
    "java": JavaRunner,
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
    runner = runner(file_name=file_name)

    try:
        runner.execute(testcase=testcase)
    except Exception:
        console.print_exception(show_locals=True)
    finally:
        runner.cleanup()