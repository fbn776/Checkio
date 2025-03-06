import multiprocessing

from core.global_store import get_value
from utils.get_local_ip import get_local_ip
from web.backend.main import run_server
from rich.console import Console

console = Console()


def handle_serve(dev):
    if dev:
        run_server(get_value("port"), dev_mode=True)
    else:
        port = get_value("port")
        server_proc = multiprocessing.Process(target=lambda : run_server(port))
        server_proc.start()

        local_ip = get_local_ip()

        help_msg = f"""[bold green]Server Started[/bold green]
To access the web interface, open the following link in your browser:
◉ [bold yellow]http://{local_ip}:{port}[/bold yellow]
◉ [bold yellow]http://localhost:{port}[/bold yellow]

[bold blue]Controls[/bold blue]
[italic]Press the following keys to perform the respective actions:[/italic]
▶ [bold green]h[/bold green]: To display the help screen
▶ [bold cyan]c[/bold cyan]: Clear the screen
▶ [bold bright_cyan]o[/bold bright_cyan]: Open the server in the browser
▶ [bold yellow]r[/bold yellow]: Restart the server
▶ [bold red]q[/bold red]: Quit the server
    """

        console.print(help_msg)

        while True:
            user_input = input("> ").strip().lower()
            if user_input == "r":
                console.print("[bold green]Restarting Server...[/bold green]")
                server_proc.terminate()
                server_proc = multiprocessing.Process(target=run_server)
                server_proc.start()
            elif user_input == "q":
                console.print("[bold red]Stopping Server...[/bold red]")
                server_proc.terminate()
                break
            elif user_input == "h":
                console.print(help_msg)
            elif user_input == "c":
                console.clear()
                console.print(help_msg)
            elif user_input == "o":
                import webbrowser
                webbrowser.open(f"http://{local_ip}:{port}")
                console.print("[bold green]Opened in browser![/bold green]")
            else:
                console.print("[bold red]Invalid Input![/bold red]")
