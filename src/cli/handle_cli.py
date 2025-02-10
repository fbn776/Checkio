import click

from cli.utils.get_version import get_version


def handle_cli(ctx, ver):
    if ver:
        # If the version flag is passed, print the version of the tool
        get_version()
    elif ctx.invoked_subcommand is None:
        # If no subcommand is passed, print the help message
        click.echo(ctx.get_help())
    else:
        # If a subcommand is passed, do nothing
        pass