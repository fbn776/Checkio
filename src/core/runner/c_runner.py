import os
import subprocess
import sys

from rich.syntax import Syntax
from rich.text import Text
from core.global_store import get_value
from core.runner.base_runner import BaseRunner
from utils.errors import DontContinue, CompilationError
from utils.utils import boxed_text, get_error_message


class CRunner(BaseRunner):
    def __init__(self, file_name, print_output=True):
        super().__init__(file_name=file_name, print_output=print_output)
        self.c_comp = get_value("c_compiler_path")

    def setup(self):
        try:
            # Compiling the c file into an executable file (named with an uuid)
            c_out = subprocess.run([self.c_comp, self.file_name, "-o", self.exec_path], capture_output=True, text=True)

            # If the compilation was unsuccessful, the error message will be displayed in a box;
            if c_out.returncode != 0:
                boxed_text(
                    self.console, "Compilation Error",
                    Syntax(
                        c_out.stderr,
                        "bash",
                        theme="ansi_dark"
                    ),
                    "bold red", "bold red"
                )

                # Raise this error to stop the execution of the program
                raise CompilationError()

        except CompilationError:
            raise DontContinue()
        except OSError as e:
            boxed_text(self.console, "OS Error", Text(str(e)), "bold red", "bold red")
            raise DontContinue()
        except Exception as e:
            self.console.print(f"[bold red]Error:[/bold red] {str(e)}")
            raise DontContinue()

    def no_testcase_run_func(self):
        if self.exec_name is None:
            boxed_text(self.console, "Error", "The current file name is None", "bold red", "bold red")
            raise DontContinue()

        res = subprocess.run([self.exec_path], stdout=sys.stdout, stderr=sys.stderr)
        if res.returncode != 0:
            boxed_text(self.console, "Error", f"The program returned a non-zero exit code\n\n[bold red]Possible cause: {get_error_message(res.returncode)}[/]", "bold red", "bold red")
            raise DontContinue()

    def testcase_run_func(self, unit):
        return subprocess.run([self.exec_path] + (unit.cli_args or []), input=unit.input, text=True, capture_output=True)

    def cleanup(self):
        try:
            os.remove(self.exec_path)
        except FileNotFoundError:
            pass
