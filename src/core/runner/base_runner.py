import os
import uuid
from pathlib import Path

from core.global_store import get_value
from utils.errors import DontContinue
from utils.utils import boxed_text


class BaseRunner:
    def __init__(self, print_output=True):
        """
        The base class for all the runners
        :param print_output: If True, the output of the program will be printed to the stdin
        """
        # The name of the executable file (This will the name of the executable file)
        self.exec_name = f"{self.gen_uuid()}"
        self.temp_path = get_value("temp_dir")
        # The path to the executable file
        self.exec_path = os.path.join(self.temp_path, self.exec_name)

        self.print_output = print_output


    def cleanup(self):
        try:
            os.remove(self.exec_path)
        except FileNotFoundError:
            pass

    @staticmethod
    def handle_file_not_exists(f_name, console):
        if Path(f_name).is_file():
            return None

        boxed_text(console, text=f"The file [yellow]'{f_name}'[/yellow] was not found.", title="File Not Found",
                   border_style="bold red", style="bold red")
        raise DontContinue()

    def gen_uuid(self):
        return str(uuid.uuid4())
