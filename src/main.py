from src.core.auth.validate_user import is_valid_user, is_admin
from src.core.check_session import is_first_session
from src.core.global_store import initialize_storage, load_data_from_json
from src.utils.utils import get_resource_path

CONFIG_PATH = get_resource_path("./config/DEFAULT_CONFIG.json")
load_data_from_json(CONFIG_PATH)
initialize_storage()

# Import all database models to register them with SQLAlchemy
from src.core.db import models

import click
from src.cli.utils.custom_formats import CustomFormats
from rich.console import Console

console = Console()

@click.group(
    cls=CustomFormats,
    help=f"{click.style('Checkio', bold=True, fg='bright_blue')} - A tool that not only tests your code but also suggests improvements and error fixes, making lab evaluations smarter and faster.",
    invoke_without_command=True
)
@click.option("-v", "--version", is_flag=True, help="Show the version of the tool")
@click.pass_context
def cli(ctx, version):
    from src.core.pre_requisites import pre_requisites
    from src.cli.handle_cli import handle_cli

    if ctx.invoked_subcommand != "config":
        if is_first_session():
            pre_requisites()
            return

    handle_cli(ctx, version)



@cli.command(help="Used to create a new testcase. [FOR ADMIN USE ONLY]")
@click.argument('name', required=False)
def create(name):
    if not is_admin():
        console.print("[bold red]Invalid credentials![/]")
        exit(1)

    from src.cli.handle_create import handle_create

    handle_create(name)


@cli.command(help="Used to run the given program.")
@click.argument('file_name')
@click.option("-t", "--testcase", help="The testcase file to run the program with.")
def run(file_name, testcase):
    from src.cli.handle_run import handle_run

    handle_run(file_name, testcase)


@cli.command(help="Serves the web interface [FOR ADMIN USE ONLY]")
@click.option('--dev', is_flag=True, help="Run the server in development mode")
def serve(dev):
    if not is_admin():
        console.print("[bold red]Invalid credentials![/]")
        exit(1)

    from src.cli.handle_serve import handle_serve

    handle_serve(dev)


@cli.command(help="Shows information about the tool")
def about():
    from src.cli.handle_about import handle_about
    handle_about()


@cli.command(help="Submit a program to be evaluated by the faculty")
@click.argument("values", nargs=-1, required=True)
@click.option("-t", "--testcase", required=True, prompt=True, help="The ID of testcase to submit the program with.")
def submit(values, testcase):
    from src.cli.handle_submit import handle_submit

    handle_submit(values, testcase)


@cli.command(help="List all the testcases.")
def list():
    from src.cli.handle_listing import handle_listing

    handle_listing()


@cli.command(help="View the details of a testcase.")
@click.argument("testcase_id")
def view(testcase_id):
    from src.cli.handle_view import handle_view
    handle_view(testcase_id)


@cli.command(help="Configure the tool. [FOR ADMIN USE ONLY]")
def config():
    from src.cli.handle_config import handle_config

    if is_first_session() or is_admin():
        handle_config()
    else:
        console.print("[bold red]Invalid credentials![/]")
        exit(1)


@cli.command(help="Helps manage users [FOR ADMIN USE ONLY]")
@click.argument('action', type=click.Choice(['create', 'delete'], case_sensitive=False))
def users(action):
    from src.core.auth.validate_user import is_valid_user
    from src.cli.handle_user_create import handle_user_create
    from src.cli.handle_user_delete import handle_user_delete

    if not is_valid_user(admin_only=True):
        console.print("[bold red]You are not authorized to perform this action![/]")
        return
    print()

    if action == 'create':
        handle_user_create()
    elif action == 'delete':
        handle_user_delete()

@cli.command(help="Check your C code for errors and memory leaks")
@click.argument('file_name')
def analyze(file_name):
    from src.cli.handle_analysis import handle_analysis

    handle_analysis(file_name)


def main():
    cli()


if __name__ == "__main__":
    main()
