import uuid
from pathlib import Path
import subprocess
from rich.console import Console
from rich.syntax import Syntax
from rich.text import Text

from core.global_store import get_value
from utils.spinners import spinner_context
from utils.utils import boxed_text

console = Console()

def last_two_lines(text):
    lines = text.splitlines()
    return "\n".join(lines[-2:]) if len(lines) >= 2 else text

def handle_analysis(file_name):
    if not file_name.endswith(".c"):
        console.print(f"[bold red]Error:[/][red] The file type is not supported[/]")
        exit(1)

    if not Path(file_name).is_file():
        console.print(f"[bold red]Error:[/][red] The file does not exist[/]")
        exit(1)

    analyze_crash(file_name)


def analyze_crash(file_name):
    debug_exe = f"{uuid.uuid4()}"
    with spinner_context(console, "Compiling...") as status:
        try:
            status.update("Analyzing...")

            status.update("Compiling...")

            status.stop()
            # Compile the C file
            compile_process = subprocess.run(
                [get_value("c_compiler_path"), "-g", file_name, "-o", debug_exe],
                capture_output=True, text=True
            )

            status.update("Analyzing...")
            status.stop()
            if compile_process.returncode != 0:
                boxed_text(
                    console, "Compilation Error",
                    Syntax(
                        compile_process.stderr,
                        "bas",
                        theme="ansi_dark"
                    ),
                    "bold red", "bold red"
                )
                exit(1)

            gdb_command = f"""run
backtrace
quit"""
            result = subprocess.run(["gdb", "--batch", "-ex", gdb_command, debug_exe], capture_output=True, text=True)

            if result.stderr:
                console.print(result.stderr)

            if result.stdout:
                console.print(Syntax(
                    last_two_lines(result.stdout.strip()),
                    "bash",
                    theme="ansi_dark"
                ))

            if result.stderr:
                console.print(Syntax(
                    result.stderr,
                    "bash",
                    theme="ansi_dark"
                ))
        except Exception as e:
            console.print(f"[bold red]Error:[/] {str(e)}")
        finally:
            # Cleanup compiled executable
            try:
                Path(debug_exe).unlink()
            except FileNotFoundError:
                pass
