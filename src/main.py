import argparse

from src.cli.create import create_pgm
from src.cli.run import run_pgm


def create_item(name):
    """Handles the 'create' command."""
    print(f"Item '{name}' has been created.")

def main():
    parser = argparse.ArgumentParser(description="A demo of the checkio")

    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    create_parser = subparsers.add_parser("create", help="Create a new testcase")
    create_parser.add_argument("name", type=str, help="Name of the testcase to create")

    run_parser = subparsers.add_parser("run", help="Run an executable with input.")
    run_parser.add_argument(
        "executable", type=str, help="Path to the executable to run."
    )
    run_parser.add_argument(
        "input", type=str, help="Input data to be piped into the executable."
    )



    args = parser.parse_args()

    # Handle the commands
    if args.command == "create":
        create_pgm()
    elif args.command == "run":
        run_pgm(args.executable, args.input)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
