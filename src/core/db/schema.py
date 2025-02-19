from db import _sql_cursor
from rich.console import Console

console = Console()


def init():
    console.print("[bold green]Creating database schema[/bold green]")

    try:
        with open("src/core/db/schema.sql", encoding="utf-8") as f:
            console.print(f"[bold green]Executing SQL script[/bold green]")
            _sql_cursor.executescript(f.read())
            _sql_cursor.connection.commit()
            console.print("[bold green]Database schema created successfully[/bold green]")
    except Exception as e:
        console.print("[bold red]Failed to create database schema[/bold red]")
        console.print_exception()


if __name__ == "__main__":
    init()
