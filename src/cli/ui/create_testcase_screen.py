from time import monotonic
from textual.app import App, ComposeResult
from textual.containers import HorizontalGroup, VerticalScroll, VerticalGroup
from textual.reactive import reactive
from textual.widgets import Button, Digits, Footer, Header, Label, Checkbox

from cli.ui.components.labelled_input import LabelledInput
from cli.ui.components.labelled_textarea import LabelledTextArea


class TimeDisplay(Digits):
    """A widget to display elapsed time."""

    start_time = reactive(monotonic)
    time = reactive(0.0)
    total = reactive(0.0)

    def on_mount(self) -> None:
        """Event handler called when widget is added to the app."""
        self.update_timer = self.set_interval(1 / 60, self.update_time, pause=True)

    def update_time(self) -> None:
        """Method to update time to current."""
        self.time = self.total + (monotonic() - self.start_time)

    def watch_time(self, time: float) -> None:
        """Called when the time attribute changes."""
        minutes, seconds = divmod(time, 60)
        hours, minutes = divmod(minutes, 60)
        self.update(f"{hours:02,.0f}:{minutes:02.0f}:{seconds:05.2f}")

    def start(self) -> None:
        """Method to start (or resume) time updating."""
        self.start_time = monotonic()
        self.update_timer.resume()

    def stop(self):
        """Method to stop the time display updating."""
        self.update_timer.pause()
        self.total += monotonic() - self.start_time
        self.time = self.total

    def reset(self):
        """Method to reset the time display to zero."""
        self.total = 0
        self.time = 0


class Stopwatch(HorizontalGroup):
    """A stopwatch widget."""

    def on_button_pressed(self, event: Button.Pressed) -> None:
        """Event handler called when a button is pressed."""
        button_id = event.button.id
        time_display = self.query_one(TimeDisplay)
        if button_id == "start":
            time_display.start()
            self.add_class("started")
        elif button_id == "stop":
            time_display.stop()
            self.remove_class("started")
        elif button_id == "reset":
            time_display.reset()

    def compose(self) -> ComposeResult:
        """Create child widgets of a stopwatch."""
        yield Button("Start", id="start", variant="success")
        yield Button("Stop", id="stop", variant="error")
        yield Button("Reset", id="reset")
        yield TimeDisplay()


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

    def compose(self) -> ComposeResult:
        """Called to add widgets to the app."""
        yield Header()
        yield Footer()
        yield VerticalScroll(
            LabelledInput("Testcase name", placeholder="Enter the name of the testcase",
                                           input_value="Haha"),
            LabelledTextArea("Description", desc="Markdown is supported"),
            RightButton(),

            VerticalGroup(TestcaseUnit(), id="timers"),
            HorizontalGroup(
                Button("Cancel", variant="error"),
                Button("Submit", variant="success"),
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


if __name__ == "__main__":
    app = CreateTestcaseScreen()
    app.run()