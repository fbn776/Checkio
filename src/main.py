from core.global_store import load_data_from_json
load_data_from_json("./config/DEFAULT_CONFIG.json")

import click
from cli.utils.custom_formats import CustomFormats
from rich.console import Console
import core.db.init_db

console = Console()


@click.group(
    cls=CustomFormats,
    help=f"{click.style('Checkio', bold=True, fg='bright_blue')} - A tool that not only tests your code but also suggests improvements and error fixes, making lab evaluations smarter and faster.",
    invoke_without_command=True
)
@click.option("-v", "--version", is_flag=True, help="Show the version of the tool")
@click.pass_context
def cli(ctx, version):
    from core.pre_requisites import pre_requisites
    from cli.handle_cli import handle_cli
    handle_cli(ctx, version)

    if ctx.invoked_subcommand != "config":
        pre_requisites()


@cli.command(help="Used to create a new testcase.")
@click.argument('name', required=False)
def create(name):
    from cli.handle_create import handle_create

    handle_create(name)


@cli.command(help="Used to run the given program.")
@click.argument('file_name')
@click.option("-t", "--testcase", help="The testcase file to run the program with.")
def run(file_name, testcase):
    from cli.handle_run import handle_run

    handle_run(file_name, testcase)


@cli.command(help="Serves the web interface")
@click.option('--dev', is_flag=True, help="Run the server in development mode")
def serve(dev):
    from cli.handle_serve import handle_serve

    handle_serve(dev)


@cli.command(help="Shows information about the tool")
def about():
    from cli.handle_about import handle_about
    handle_about()


@cli.command(help="Submit a program to be evaluated by the faculty")
@click.argument("values", nargs=-1, required=True)
@click.option("-t", "--testcase", required=True, prompt=True, help="The ID of testcase to submit the program with.")
def submit(values, testcase):
    from cli.handle_submit import handle_submit

    handle_submit(values, testcase)


@cli.command(help="List all the testcases.")
def list():
    from cli.handle_listing import handle_listing

    handle_listing()


@cli.command(help="View the details of a testcase.")
@click.argument("testcase_id")
def view(testcase_id):
    from cli.handle_view import handle_view
    handle_view(testcase_id)


@cli.command(help="Configure the tool.")
def config():
    from cli.handle_config import handle_config

    handle_config()


@cli.command(help="Helps manage users [FOR ADMIN USE ONLY]")
@click.argument('action', type=click.Choice(['create', 'delete'], case_sensitive=False))
def users(action):
    from core.auth.validate_user import is_valid_user
    from cli.handle_user_create import handle_user_create
    from cli.handle_user_delete import handle_user_delete

    if not is_valid_user(admin_only=True):
        console.print("[bold red]You are not authorized to perform this action![/]")
        return
    print()

    if action == 'create':
        handle_user_create()
    elif action == 'delete':
        handle_user_delete()


@cli.command()
def test():
    from cli.do_testing import do_testing

    do_testing()


@cli.command(help="Check your C code for errors and memory leaks")
@click.argument('file_name')
def analyze(file_name):
    from cli.handle_analysis import handle_analysis

    handle_analysis(file_name)


if __name__ == "__main__":
    cli()
