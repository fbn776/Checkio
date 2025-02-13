from textual.app import ComposeResult
from textual.containers import VerticalScroll, Container
from textual.widget import Widget
from cli.ui.components.labelled_textarea import LabelledTextArea

class TestcaseUnit(Widget):
    DEFAULT_CSS = """
        .testcase-unit {
            border: round $accent;
            height: auto;
            margin: 0 2;
        }
    """
    def __init__(self) -> None:
        super().__init__()

    def compose(self) -> ComposeResult:
        with Container(classes="testcase-unit"):
            yield LabelledTextArea("Input")
            yield LabelledTextArea("Output")