import datetime
import os
import time

from click import Abort
from rich.console import Console
from core.db.init_db import init_db
from core.global_store import get_value
from utils.spinners import spinner_context
from utils.utils import boxed_text, is_superuser

console = Console()

def handle_config():
    error_happened = False

    session_file = get_value("session_file")
    with spinner_context(console, "Configuring Checkio...") as status:
        try:
            if session_file is None:
                console.print("[bold red]Invalid config file; Missing '[yellow]session_file[/yellow]'[/]")
                exit(1)

            with open(session_file, "w") as f:
                f.write(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

            status.update("Setting Up Database...")
            status.stop()
            init_db()
            time.sleep(1)
            status.start()
            status.update("Done")
            console.print("[bold bright_cyan]Checkio[/] has been configured successfully!")
        except KeyboardInterrupt:
            console.print("[bold red]Aborted![/]")
            error_happened = True
        except Abort:
            print()
            console.print("[bold red]Aborted![/]")
            error_happened = True
        except Exception as e:
            boxed_text(console, "Error", str(e), "bold red", "bold red")
            error_happened = True
        finally:
            if error_happened:
                try:
                    os.remove(session_file)
                except:
                    pass
                exit(1)

