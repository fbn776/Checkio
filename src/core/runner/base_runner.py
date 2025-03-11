import json
import os
import subprocess
import uuid
from abc import ABC, abstractmethod
from pathlib import Path
from typing import Callable, final
from rich.console import Console
from core.db.db import get_db
from core.db.models.Testcase import Testcase
from core.global_store import get_value
from utils.errors import DontContinue
from utils.pydantic_models import TestUnitObj, TestCaseObj
from utils.utils import boxed_text
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

    def __get_testcase(self, group_id: str, testcase_id: str) -> TestCaseObj:
        """
        Get the testcase from the database
        """
        db = next(get_db())

        testcase = db.query(Testcase).filter_by(id=testcase_id, group_id=group_id).first()
        if not testcase:
            boxed_text(self.console, "Error", "Testcase not found", "bold red", "bold red")
            raise DontContinue()

        return TestCaseObj(title=testcase.title, description=testcase.description, data=json.loads(testcase.data),
                           id=testcase.id, group_id=testcase.group_id)

    def handle_file_not_exists(self):
        if Path(self.file_name).is_file():
            return None

        boxed_text(self.console, text=f"The file [yellow]'{self.file_name}'[/yellow] was not found.",
                   title="File Not Found",
                   border_style="bold red", style="bold red")
        raise DontContinue()

    def __check_output(self, testunit: TestUnitObj, output):
        """
        Check the output of the program and return True or False
        """
        return output.strip() == testunit.output.strip()

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
    def testcase_run_func(self, unit: TestUnitObj):
        """This function is to be implemented by the child classes.
        This gets called when the runner is run with a testcase and the testcase is passed to this function.
        """
        pass

    @final
    def __run_with_testcase(self, testcase_id, testcase_group,
                            run_func: Callable[[TestUnitObj], subprocess.CompletedProcess]) -> None:
        """
        Runs a given function `run_func` with the given testcase. The run function should return a subprocess.CompletedProcess object
        """
        testcase_data = self.__get_testcase(testcase_id=testcase_id, group_id=testcase_group)

        i = 1
        for unit in testcase_data.data:
            process = run_func(unit)
            passed = self.__check_output(unit, process.stdout)
            self.console.print(f"""{":white_check_mark: " if passed else ":cross_mark: "} [bold underline cyan]Testcase #{i}[/]
[bold]Input:[/]
{unit.input}{"" if not unit.cli_args else f"\n[bold]CLI Args:[/]\n{" ".join(unit.cli_args)}"}
[bold]Expected Output:[/]
{unit.output}
[bold]Output:[/]
{process.stdout}
[bold]Status:[/] {"[black on bright_green] Passed [/]" if passed else "[black on red] Failed [/]"}
""")

            print()
            i += 1

    def execute(self, testcase_id, testcase_group):
        with spinner_context(self.console, "Compiling...") as status:
            try:
                status.update("Setting Up...")
                self.handle_file_not_exists()
                self.setup()
                status.update("Running...")
                status.stop()

                if testcase_id and testcase_group:
                    self.__run_with_testcase(testcase_id=testcase_id, testcase_group=testcase_group,
                                             run_func=self.testcase_run_func)
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
