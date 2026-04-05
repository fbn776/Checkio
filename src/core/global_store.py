import json
from rich.console import Console
from utils.utils import get_storage_path, get_storage_root

global_store = {}
console = Console()

def load_data_from_json(file_path):
    global global_store
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
            global_store.update(data)
    except FileNotFoundError:
        console.print(f"[bold red]Error Setting Up Config File:[/] The file '[yellow italic]{file_path}[/]' was not found.")
        console.print_exception(show_locals=True)
    except json.JSONDecodeError:
        console.print(f"[bold red]Error Parsing Config File:[/] The file '[yellow italic]{file_path}[/]' could not be parsed.")
        console.print_exception(show_locals=True)
    except Exception:
        console.print_exception(show_locals=True)


def initialize_storage():
    """Create the persistent storage directory and populate derived file paths."""
    storage_root = get_storage_root(create=True)
    global_store["storage_root"] = str(storage_root)

    global_store["config_path"] = str(get_storage_path("config.json"))
    global_store["db_path"] = str(get_storage_path("checkio.db"))
    global_store["identifier_db_path"] = str(get_storage_path("identifier.sqlite"))
    global_store["temp_dir"] = str(get_storage_path("temp", create_parent=True))
    global_store["session_file"] = str(get_storage_path(global_store.get("session_file", ".checkio_session"), create_parent=True))


def set_value(key, value):
    global global_store
    global_store[key] = value


def get_value(key):
    return global_store.get(key, None)


def display_store():
    print("Current Global Store:")
    for key, value in global_store.items():
        print(f"{key}: {value}")


# # Set a new key-value pair
# set_value('new_key', 'new_value')
#
# # Get a value by key
# print(get_value('new_key'))  # Output: new_value
#
# # Display the entire global store
# display_store()
