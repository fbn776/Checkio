import datetime
import os
from pathlib import Path
from click import Abort
from rich.console import Console
from src.core.auth.init_user import init_user
from src.core.auth.validate_user import is_valid_user
from src.core.check_session import is_first_session
from src.core.db.init_db import init_db
from src.core.global_store import get_value
from src.utils.spinners import spinner_context
from src.utils.utils import boxed_text

console = Console()


def handle_config():
    already_configured = False
    error_happened = False
    session_file = get_value("session_file")

    try:
        # If the config is already done, then we don't need to do it again, unless the user is a superuser
        # NOTE: sudo not supported now; see https://stackoverflow.com/questions/54026213/command-not-found-with-sudo-but-works-without-sudo
        if not is_first_session():
            already_configured = True
            console.print("[bold yellow]Checkio is already configured. Login to reconfigure.[/]")
            if not is_valid_user():
                console.print("[bold red]Invalid credentials![/]")
                exit(1)
            else:
                console.print("[bold green]Logged in[/]")

        with spinner_context(console, "Configuring Checkio...") as status:
            if session_file is None:
                console.print("[bold red]Invalid config file; Missing '[yellow]session_file[/yellow]'[/]")
                exit(1)

            session_path = Path(session_file)
            session_path.parent.mkdir(parents=True, exist_ok=True)
            with open(session_path, "w") as f:
                f.write(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

            status.update("Setting Up Database...")
            status.stop()
            # Set up the database
            init_db()

            status.update("Setting Up User...")
            status.stop()

            # Set up the user
            init_user()

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
        console.print_exception(show_locals=True)
    finally:
        if error_happened and not already_configured:
            try:
                if session_file:
                    os.remove(session_file)
            except:
                pass
            exit(1)
