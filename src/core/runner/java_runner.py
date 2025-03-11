import os
import subprocess

from rich.syntax import Syntax
from rich.text import Text

from core.global_store import get_value
from core.runner.base_runner import BaseRunner
from utils.errors import DontContinue, CompilationError
from utils.utils import boxed_text


class JavaRunner(BaseRunner):
    def __init__(self, file_name, print_output=True):
        super().__init__(file_name=file_name, print_output=print_output)
        self.javac = get_value("javac_path")
        self.jvm = get_value("jvm_path")

    def setup(self):
        try:
            c_out = subprocess.run([self.javac, self.file_name, "-d", self.temp_path], capture_output=True, text=True)

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

        """
        Run the java file. First add class path to the temp directory and then run the file (only needs the base name of the file, stripped of .java)
        """
        subprocess.run([self.jvm, '-cp', self.temp_path, os.path.basename(self.file_name).replace(".java", "")])

    def testcase_run_func(self, unit):
        return subprocess.run([self.jvm, '-cp', self.temp_path, os.path.basename(self.file_name).replace(".java", "")] + (unit.cli_args or []), input=unit["input"], text=True, capture_output=True)

    def cleanup(self):
        pass
