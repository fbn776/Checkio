import getpass

import click
from rich.console import Console

from core.db.db import get_db
from core.db.models.User import User
from utils.errors import AuthFailed
from utils.hashing import hash_password

console = Console()


def init_user():
    console.print("[bold underline bright_yellow]Welcome to Checkio![/]")
    console.print("[italic yellow]Let's set up the admin credentials[/]")
    print()

    os_username = getpass.getuser()

    username = click.prompt("Enter your username", type=str, show_default=True, default=os_username)
    password = click.prompt("Enter your password", type=str, hide_input=True, confirmation_prompt=True)

    db = next(get_db())
    user = db.query(User).filter_by(username=username).first()

    if user:
        console.print("[bold red]User already exists![/]")
        raise AuthFailed()

    hashed_password = hash_password(password)
    user = User(username=username, password=hashed_password, role="admin")
    db.add(user)
    db.commit()

    console.print("[bold green]User created successfully![/]")
