import json
import subprocess


def handle_run():
    print("Running the given program.")

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


def run_pgm(name, path_to_executable):
    """Handles the 'run' command."""
    print(f"Item '{name}' has been run.")
    with open(f"store/{name}.json", "r") as json_file:
        data = json.load(json_file)
        input_data = data["input"]
        output_data =exec_pgm(path_to_executable, input_data)
        print(f"Output:\n{output_data.strip()}")
        print("Match" if output_data.strip() == data["output"].strip() else "Mismatch")