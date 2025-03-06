import click
from rich.console import Console
from core.db.db import get_db
from core.db.models.User import User
from utils.hashing import check_password_hash

console = Console()

def is_valid_user(in_username = None, in_password = None) -> bool:
    """Check if the user is valid
    :param in_username: The username to check (optional ; If not provided, it will prompt the user)
    :param in_password: The password to check (optional ; If not provided, it will prompt the user)
    """
    username = in_username or click.prompt("Username", type=str)
    password = in_password or click.prompt("Password", type=str, hide_input=True)

    db = next(get_db())
    user = db.query(User).filter_by(username=username).first()
    try:
        if user and check_password_hash(password, user.password):
            return True
        else:
            return False
    except Exception as e:
        return False

