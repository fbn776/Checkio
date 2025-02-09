from rich.console import Console

from cli.ui.create_testcase import CreateTestcaseUI

console = Console()


def handle_create(passed_name):
    # # If name is not passed as an argument, ask for it and loop until a valid name is entered
    # if not passed_name:
    #     while True:
    #         testcase_name = Prompt.ask("Enter your name").strip()
    #         if testcase_name:
    #             break
    #         else:
    #             fprint("[bold red]Error:[/bold red] Testcase name cannot be empty. Please try again.")

    CreateTestcaseUI(passed_name).run()
