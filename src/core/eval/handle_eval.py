import os
from rich.pretty import pprint
from core.global_store import get_value
from core.runner.c_runner import CRunner
from core.runner.java_runner import JavaRunner
from core.runner.python_runner import PythonRunner
from utils.find_lang import find_lang
from pathlib import Path

temp_path = get_value("temp_dir")
runners = {
    "c": CRunner,
    "py": PythonRunner,
    "java": JavaRunner,
}


def handle_eval(submitted_file, testcase_id, group_id):
    pprint(submitted_file)

    path = Path(submitted_file['name'])
    filename = path.name

    file_path = os.path.join(temp_path, filename)

    try:
        with open(file_path, "w") as file:
            file.write(submitted_file['content'])

        file_type = find_lang(filename)
        runner = runners.get(file_type)

        if runner is None:
            print(f"[bold red]Error:[/][red] The file type is not supported[/]")
            exit(1)

        # Instantiating the runner
        runner = runner(file_name=file_path)

        try:
            result = runner.execute(testcase_id=testcase_id, testcase_group=group_id)

            return result

        except Exception as e:
            print(e)

    except Exception as e:
        print(e)
        print("An error occurred while writing the file")
    finally:
        try:
            os.remove(file_path)
        except:
            pass