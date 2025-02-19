import os
import uuid
from pathlib import Path

from core.global_store import get_value
from utils.errors import DontContinue
from utils.utils import boxed_text


class BaseRunner:
    def __init__(self):
        # The name of the executable file (This will the name of the executable file)
        self.exec_name = f"{self.gen_uuid()}"
        self.temp_path = get_value("temp_dir")
        # The path to the executable file
        self.exec_path = os.path.join(self.temp_path, self.exec_name)

    def cleanup(self):
        try:
            os.remove(self.exec_path)
        except FileNotFoundError:
            pass

    def handle_file_not_exists(self, f_name, console):
        if Path(f_name).is_file():
            return None

        boxed_text(console, text=f"The file [yellow]'{f_name}'[/yellow] was not found.", title="File Not Found",
                   border_style="bold red", style="bold red")
        raise DontContinue()

    def gen_uuid(self):
        return str(uuid.uuid4())
