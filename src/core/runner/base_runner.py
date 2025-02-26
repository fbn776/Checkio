import json
import os
import subprocess
import uuid
from abc import ABC, abstractmethod
from pathlib import Path
from typing import Callable, final
from rich.console import Console
from core.db.testcases import get_testcase_by_name
from core.global_store import get_value
from utils.errors import DontContinue
from utils.utils import boxed_text
from rich.panel import Panel
from rich.syntax import Syntax
from rich.text import Text
from rich.console import Group
from utils.spinners import spinner_context


class BaseRunner(ABC):
    def __init__(self, file_name, print_output=True, console=None):
        """
        The base class for all the runners
        :param print_output: If True, the output of the program will be printed to the stdin
        """
        # The name of the executable file (This will the name of the executable file)
        self.exec_name = f"{uuid.uuid4()}"
        self.temp_path = get_value("temp_dir")
        # The path to the executable file
        self.exec_path = os.path.join(self.temp_path, self.exec_name)
        self.print_output = print_output
        # Init console
        self.console = Console() if console is None else console
        self.file_name = file_name

    def __get_testcase(self, testcase):
        """
        Get the testcase from the database
        """
        db_rows = get_testcase_by_name(testcase)
        # If the testcase is not found, the program will not run
        if db_rows is None:
            self.console.print(f"[bold red]Error:[/] [red]The testcase '[yellow italic]{testcase}[/]' was not found[/]")
            # TODO - Implement show similar testcases
            raise DontContinue()

        return json.loads(db_rows[3])

    def handle_file_not_exists(self):
        if Path(self.file_name).is_file():
            return None

        boxed_text(self.console, text=f"The file [yellow]'{self.file_name}'[/yellow] was not found.",
                   title="File Not Found",
                   border_style="bold red", style="bold red")
        raise DontContinue()

    def __check_output(self, testunit, output):
        """
        Check the output of the program and return True or False
        """
        return output.strip() == testunit["output"].strip()

    @abstractmethod
    def cleanup(self):
        """Needs to be implemented in the child classes. This function is called after a program is executed or any type of error occurs."""
        pass

    @abstractmethod
    def setup(self):
        """
        This function is to be implemented by the child classes.
        This is called before the program is executed.
        This setups up stuffs like compiling the lang, or any other setups.
        """
        pass

    @abstractmethod
    def no_testcase_run_func(self):
        """This function is to be implemented by the child classes.
        This gets called when the runner is run without a testcase and the function is called.
        """
        pass

    @abstractmethod
    def testcase_run_func(self, unit):
        """This function is to be implemented by the child classes.
        This gets called when the runner is run with a testcase and the testcase is passed to this function.
        """
        pass

    @final
    def __run_with_testcase(self, testcase, run_func: Callable[[dict], subprocess.CompletedProcess]) -> None:
        """
        Runs a given function `run_func` with the given testcase. The run function should return a subprocess.CompletedProcess object
        """
        testcase_data = self.__get_testcase(testcase)

        i = 1
        for unit in testcase_data["testcases"]:
            process = run_func(unit)
            passed = self.__check_output(unit, process.stdout)
            boxed_text(self.console, f"Testcase #{i}",
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

    def execute(self, testcase):
        with spinner_context(self.console, "Compiling...") as status:
            try:
                status.update("Setting Up...")
                self.handle_file_not_exists()
                self.setup()
                status.update("Running...")
                status.stop()

                if testcase:
                    self.__run_with_testcase(testcase, self.testcase_run_func)
                else:
                    self.no_testcase_run_func()

                status.update("Done")
                status.start()
            except DontContinue:
                exit(1)
            except Exception as e:
                self.console.print(f"[bold red]Operation failed: {str(e)}")
                exit(1)
            finally:
                self.cleanup()
