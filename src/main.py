import click

from cli.do_testing import do_testing
from cli.handle_cli import handle_cli
from cli.handle_config import handle_config
from cli.handle_create import handle_create
from cli.handle_listing import handle_listing
from cli.handle_run import handle_run
from cli.handle_serve import handle_serve
from cli.handle_submit import handle_submit
from cli.utils.custom_formats import CustomFormats
from cli.handle_about import handle_about
from core.global_store import load_data_from_json
from core.pre_requisites import pre_requisites

# Load the default configuration file
load_data_from_json("./config/DEFAULT_CONFIG.json")


@click.group(
    cls=CustomFormats,
    help=f"{click.style('Checkio', bold=True, fg='bright_blue')} - A tool that not only tests your code but also suggests improvements and error fixes, making lab evaluations smarter and faster.",
    invoke_without_command=True
)
@click.option("-v", "--version", is_flag=True, help="Show the version of the tool")
@click.pass_context
def cli(ctx, version):
    handle_cli(ctx, version)

    if ctx.invoked_subcommand != "config":
        pre_requisites()


@cli.command(help="Used to create a new testcase.")
@click.argument('name', required=False)
def create(name):
    handle_create(name)


@cli.command(help="Used to run the given program.")
@click.argument('file_name')
@click.option("-t", "--testcase", help="The testcase file to run the program with.")
def run(file_name, testcase):
    handle_run(file_name, testcase)


@cli.command(help="Serves the web interface")
@click.option('--dev', is_flag=True, help="Run the server in development mode")
def serve(dev):
    handle_serve(dev)


@cli.command(help="Shows information about the tool")
def about():
    handle_about()


@cli.command(help="Submit a program to be evaluated by the faculty")
@click.argument("values", nargs=-1, required=True)
@click.option("-t", "--testcase", required=True, prompt=True, help="The ID of testcase to submit the program with.")
def submit(values, testcase):
    handle_submit(values, testcase)


@cli.command(help="List all the testcases.")
def list():
    handle_listing()


@cli.command(help="View the details of a testcase.")
@click.argument("testcase_id")
def view(testcase_id):
    print(f"Viewing testcase with ID: {testcase_id}")


@cli.command(help="Configure the tool.")
def config():
    handle_config()

@cli.command(help="Run")
def users():
    print("Users")

@cli.command()
def test():
    do_testing()


if __name__ == "__main__":
    cli()
