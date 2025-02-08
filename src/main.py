import click
from cli.utils.custom_help import CustomHelp

@click.group(
    cls=CustomHelp,
    help =
        f"{click.style("Checkio", bold=True, fg="bright_blue")} - A tool that not only tests your code but also suggests improvements and error fixes, making lab evaluations smarter and faster."
)
def cli():
    pass

@cli.command(help=click.style("This is a bright green help message", fg="green", bold=True))
@click.argument('name', required=False)
def create(name):
    print(name)

@cli.command()
@click.argument('file_name')
@click.option("-c", "--testcase", help="ID of the testcase")
def run(file_name, testcase):
    """The `run` command tool"""
    print('running', file_name, 'in', testcase)


@cli.command()
def serve():
    """Used to serve the web server"""
    print('Serving web server locally')

if __name__ == "__main__":
    cli()

