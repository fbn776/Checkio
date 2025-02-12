from textual.app import App, ComposeResult
from textual.containers import HorizontalGroup, VerticalScroll, VerticalGroup
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
        yield LabelledTextArea("Input", classes="input")
        yield LabelledTextArea("Output", classes="output")

class CreateTestcaseScreen(App):
    CSS_PATH = "global.tcss"

    BINDINGS = [
        ("a", "add_testcase", "Add Testcase"),
        ("r", "remove_testcase", "Remove Testcase"),
    ]

    testcase_count = 0

    def __init__(self, passed_name: str = None) -> None:
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
                                           input_value=self.passed_name, id="testcase-name"),
            LabelledTextArea("Description", desc="Markdown is supported", id="testcase-description"),
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
            testcase_name = self.query_one("#testcase-name")
            testcase_description = self.query_one("#testcase-description")
            testcases = self.query("TestcaseUnit")

            print("Testcase Name:", testcase_name)
            print("Testcase Description:", testcase_description)

            for unit in testcases:
                testcase_title = unit.query_one("TestcaseTitle")
                testcase_input = unit.query_one(".input").text_area.text
                testcase_output = unit.query_one(".output").text_area.text

                print("Testcase Title:", testcase_title)
                print("Testcase Input:", testcase_input)
                print("Testcase Output:", testcase_output)

            # self.exit(result=f"Created Successfully", return_code=0)


        if event.button.id == "start":
            self.add_class("started")
        elif event.button.id == "stop":
            self.remove_class("started")


if __name__ == "__main__":
    app = CreateTestcaseScreen()
    app.run()