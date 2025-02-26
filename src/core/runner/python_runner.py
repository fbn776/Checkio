import subprocess
from core.global_store import get_value
from core.runner.base_runner import BaseRunner


class PythonRunner(BaseRunner):
    def __init__(self, file_name, print_output=True):
        super().__init__(file_name=file_name, print_output=print_output)
        self.python = get_value("python_path")

    def setup(self):
        pass

    def no_testcase_run_func(self):
        subprocess.run([self.python, self.file_name])

    def testcase_run_func(self, unit):
        return subprocess.run([self.python, self.file_name], input=unit["input"], text=True, capture_output=True)

    def cleanup(self):
        pass
