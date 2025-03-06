import click
from rich.console import Console

from core.db.db import get_db
from core.db.models.User import User
from utils.hashing import hash_password

console = Console()

def handle_user_create():
    console.print("[bold underline blue]Creating a user[/]")


    username = click.prompt("Enter new user username", type=str)
    password = click.prompt("Enter new user password", type=str, hide_input=True, confirmation_prompt=True)

    db = next(get_db())
    user = db.query(User).filter_by(username=username).first()

    if user:
        console.print("[bold red]User already exists![/]")
        return

    hashed_password = hash_password(password)
    user = User(username=username, password=hashed_password, role="faculty")
    db.add(user)
    db.commit()

    console.print(f"[bold green]User '[yellow]{user.username}[/yellow]' created successfully![/]")

