import json
import subprocess
import time

from rich.panel import Panel
from rich.syntax import Syntax
from rich.text import Text

from core.db.testcases import get_testcase_by_name
from core.global_store import get_value
from core.runner.base_runner import BaseRunner
from rich.console import Console, Group
from utils.errors import DontContinue, CompilationError
from utils.spinners import spinner_context
from utils.utils import boxed_text

console = Console()


class CRunner(BaseRunner):
    def __init__(self):
        super().__init__()
        self.c_comp = get_value("c_compiler_path")

    def _setup(self, f_name):
        try:
            c_out = subprocess.run([self.c_comp, f_name, "-o", self.exec_path], capture_output=True, text=True)

            # If the compilation was unsuccessful, the error message will be displayed in a box;
            if c_out.returncode != 0:
                boxed_text(console, "Compilation Error",
                           Syntax(
                               c_out.stderr,
                               "bash",
                               theme="ansi_dark"
                           ),
                           "bold red", "bold red")

                # Raise this error to stop the execution of the program
                raise CompilationError()

        except OSError as e:
            boxed_text(console, "OS Error", Text(str(e)), "bold red", "bold red")
            raise DontContinue()
        except Exception as e:
            console.print(f"[bold red]Error:[/bold red] {str(e)}")
            raise DontContinue()

    def _run_without_testcase(self):
        if self.exec_name is None:
            boxed_text(console, "Error", "The current file name is None", "bold red", "bold red")
            raise DontContinue()

        subprocess.run([self.exec_path])

    def _run_with_testcase(self, testcase):
        db_rows = get_testcase_by_name(testcase)
        # If the testcase is not found, the program will not run
        if db_rows is None:
            console.print(f"[bold red]Error:[/] [red]The testcase '[yellow italic]{testcase}[/]' was not found[/]")
            # boxed_text(console, "Error", "The testcase was not found", "bold red", "bold red")
            raise DontContinue()

        testcase_data = json.loads(db_rows[3])
        print(testcase_data.get("input"))

        i = 1
        for unit in testcase_data["testcases"]:
            process = subprocess.run([self.exec_path], input=unit["input"], text=True, capture_output=True)
            passed = process.stdout.strip() == unit["output"].strip()
            boxed_text(console, f"Testcase #{i}",
                       Group(
                           Panel(Syntax(unit["input"], "bash", theme="ansi_dark"), title="Input"),
                           Panel(Syntax(unit["output"], "bash", theme="ansi_dark"), title="Expected Output"),
                           Panel(Syntax(process.stdout, "bash", theme="ansi_dark"), title="Output"),
                           Panel(
                               Text("Passed" if passed else "Failed", justify="center"),
                               style="bold green" if passed else "bold red"

                           )
                       ),
                       "bold green", "bold green")
            print()
            i += 1

        print(self.exec_path, testcase)

    def execute(self, f_name, testcase):
        with spinner_context(console, "Compiling...") as status:
            try:
                status.update("Compiling...")
                self.handle_file_not_exists(f_name, console)
                self._setup(f_name)
                status.update("Running...")
                status.stop()

                if testcase:
                    self._run_with_testcase(testcase)
                else:
                    self._run_without_testcase()

                status.update("Done")
                status.start()
                # time.sleep(2)
            except Exception as e:
                console.print(f"[bold red]Operation failed: {str(e)}")
                # TODO - Remove this in production
                console.print_exception(show_locals=True)
