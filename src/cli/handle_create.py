from rich.console import Console

from cli.ui.create_testcase_screen import CreateTestcaseScreen

console = Console()


def handle_create(passed_name):
    result = CreateTestcaseScreen(passed_name).run()

    print("Result:", result)
