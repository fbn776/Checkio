from time import monotonic
from textual.app import App, ComposeResult
from textual.containers import HorizontalGroup, VerticalScroll, VerticalGroup
from textual.reactive import reactive
from textual.widgets import Button, Digits, Footer, Header, Label, Checkbox
from cli.ui.components.labelled_input import LabelledInput
from cli.ui.components.labelled_textarea import LabelledTextArea

class RightButton(HorizontalGroup):
    def compose(self) -> ComposeResult:
        yield Button("Preview", classes="dock-right", variant="primary")

class TestcaseTitle(HorizontalGroup):
    def __init__(self, title: str) -> None:
        self.title = title
        super().__init__()

    def compose(self) -> ComposeResult:
        yield Label(self.title, classes="testcase_label")
        yield Checkbox("Hidden", classes="testcase_checkbox")

class TestcaseUnit(VerticalGroup):
    def __init__(self, testcase_count: int = 1) -> None:
        self.testcase_count = testcase_count
        super().__init__()

    def compose(self) -> ComposeResult:
        yield TestcaseTitle(f"Testcase {self.testcase_count}")
        yield LabelledTextArea("Input")
        yield LabelledTextArea("Output")

class CreateTestcaseScreen(App):
    CSS_PATH = "global.tcss"

    BINDINGS = [
        ("a", "add_testcase", "Add Testcase"),
        ("r", "remove_testcase", "Remove Testcase"),
    ]

    testcase_count = 0

    def __init__(self, passed_name: str):
        super().__init__()
        self.passed_name = passed_name or ""

    def on_mount(self):
        self.title = "Create Testcases"


    def compose(self) -> ComposeResult:
        """Called to add widgets to the app."""
        yield Header()
        yield Footer()
        yield VerticalScroll(
            LabelledInput("Testcase name", placeholder="Enter the name of the testcase",
                                           input_value=self.passed_name),
            LabelledTextArea("Description", desc="Markdown is supported"),
            RightButton(),

            VerticalGroup(TestcaseUnit(), id="timers"),
            HorizontalGroup(
                Button("Cancel", variant="error", id="cancel-button"),
                Button("Submit", variant="success", id="submit-button"),
                id="bottom-buttons"
            )
        )

    def action_add_testcase(self) -> None:
        """An action to add a timer."""
        self.testcase_count += 1
        new_testcase = TestcaseUnit(self.testcase_count)
        self.query_one("#timers").mount(new_testcase)
        new_testcase.scroll_visible()

    def action_remove_testcase(self) -> None:
        timers = self.query("TestcaseUnit")
        if timers:
            self.testcase_count -= 1
            timers.last().remove()

    def on_button_pressed(self, event: Button.Pressed) -> None:
        if event.button.id == "cancel-button":
            self.exit(result="Aborted", return_code=1)

        if event.button.id == "submit-button":
            self.exit(result="Created Successfully", return_code=0)

        if event.button.id == "start":
            self.add_class("started")
        elif event.button.id == "stop":
            self.remove_class("started")


if __name__ == "__main__":
    app = CreateTestcaseScreen()
    app.run()