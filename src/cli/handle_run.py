import json
import subprocess
from rich.console import Console

from core.db.testcases import get_testcase_by_name

console = Console()

def handle_run(file_name, testcase):
    print("Running the given program.")
    try:
        data = get_testcase_by_name(testcase)
        if data is None:
            console.print(f"[red]Error:[/red] The testcase '{testcase}' was not found.")
            return

        print(data[3])

        input_data = json.loads(data[3])
        print(input_data)
        with open(file_name, "r") as file:
            src = file.read()
            print(src, input_data)
            # process = subprocess.run(
            #     src,
            #     input=input_data[],
            #     text=True,
            #     capture_output=True,
            #     check=True
            # )

    except FileNotFoundError:
        console.print(f"[red]Error:[/red] The file '{file_name}' was not found.")


def exec_pgm(executable, input_data):
    try:
        process = subprocess.run(
            executable,
            input=input_data,
            text=True,
            capture_output=True,
            check=True
        )

        if process.stderr:
            print("Executable Error Output:")
            print(process.stderr)

        return process.stdout

    except FileNotFoundError:
        print(f"Error: The executable '{executable}' was not found.")
    except subprocess.CalledProcessError as e:
        print(f"Error: The executable failed with return code {e.returncode}.")
        print(f"Stderr: {e.stderr}")


