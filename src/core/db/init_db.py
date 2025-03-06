import click
from rich.console import Console
from sqlalchemy import inspect
from core.db.db import Base, engine
import core.db.models.Group
import core.db.models.Testcase
import core.db.models.User

console = Console()


def init_db() -> bool:
    """
    This function is for setting up the database and is supposed to be called only once
    :return: Is the database deleted and recreated or not
    """
    inspector = inspect(engine)
    recreated = False
    console.print("[bold green underline]Initializing database[/]")
    try:
        if any(x in inspector.get_table_names() for x in ["users", "groups", "testcases"]):
            console.print("[bold yellow]:warning: Database already initialized[/]")

            if click.confirm("Do you want to remove and start over?", default=False):
                console.print("[bold red]Removing existing tables...[/]")
                Base.metadata.drop_all(bind=engine)
                console.print("[bold green]Tables removed successfully![/]")
                recreated = True
    except:
        pass

    console.print("[bold green]Creating tables...[/]")
    Base.metadata.create_all(bind=engine)
    console.print("[bold green]Tables created successfully![/]")

    return recreated
