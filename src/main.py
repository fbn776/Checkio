from pickle import FALSE

import click
from cli.utils.custom_formats import CustomFormats
from cli.get_version import get_version
from cli.show_about import show_about


@click.group(
    cls=CustomFormats,
    help=
    f"{click.style("Checkio", bold=True, fg="bright_blue")} - A tool that not only tests your code but also suggests improvements and error fixes, making lab evaluations smarter and faster.",
    # invoke_without_command=True,
)
@click.option("-v", "--version", is_flag=True, help="Show the version of the tool")
@click.pass_context
def cli(ctx, version):
    if version:
        get_version()
    # elif not ctx.invoked_subcommand:
    #     click.echo(ctx.get_help())


@cli.command(help="Used to create a new testcase.",cls = CustomFormats)
@click.argument('name', required=False)
def create(name):
    print(name)


@cli.command(
    help="Used to run the given program.",
    cls = CustomFormats
)
@click.argument('file_name')
@click.option("-c", "--testcase", help="ID of the testcase")
def run(file_name, testcase):
    print('running', file_name, 'in', testcase)


@cli.command(help="Serves the web interface", cls = CustomFormats)
def serve():
    print('Serving web server locally')


@cli.command(help="Shows information about the tool", cls = CustomFormats)
def about():
    print(show_about())


if __name__ == "__main__":
    cli()
