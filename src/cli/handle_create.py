from rich.console import Console

from cli.ui.create_testcase_screen import CreateTestcaseScreen

console = Console()


def handle_create(passed_name):
    CreateTestcaseScreen(passed_name).run()
