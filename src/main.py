import click
from cli.handle_cli import handle_cli
from cli.handle_create import handle_create
from cli.handle_run import handle_run
from cli.handle_serve import handle_serve
from cli.utils.custom_formats import CustomFormats
from cli.handle_about import handle_about
from core.global_store import load_data_from_json

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
def serve():
    handle_serve()


@cli.command(help="Shows information about the tool")
def about():
    handle_about()

if __name__ == "__main__":
    cli()