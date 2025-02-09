from typing import List, Tuple

import click
from rich.layout import Layout
from textual.app import App, ComposeResult
from textual.containers import VerticalScroll, Container
from textual.layouts.grid import GridLayout
from textual.reactive import reactive
from textual.widgets import Header, Button, Static, Label
from cli.ui.components.TestcaseUnit import TestcaseUnit
from cli.ui.components.labelled_input import LabelledInput
from cli.ui.components.labelled_textarea import LabelledTextArea


class CreateTestcaseUI(App):
    CSS_PATH = "global.tcss"
    DEFAULT_CSS = """
    #add-testcase {
    	max-width: 5;
    }
    .no-testcases {
        color: white 20%;
        align: center top;
    }
    .label-testcase {
        margin-top: 1;
        margin-left: 2;
        text-style: bold;
    }
    .center-align {
        align: center middle;
    }
    
    .grid-cont{
        layout: grid;
        grid-size: 3 2;
        width: 100%;
        height: auto;
    }
    """

    testcases = reactive([], recompose=True)

    def __init__(self, name: str = "") -> None:
        self.testcase_name = name
        super().__init__()

    def compose(self) -> ComposeResult:
        yield Header(icon=None)
        with VerticalScroll():
            yield LabelledInput("Testcase name", placeholder="Enter the name of the testcase",
                                input_value=self.testcase_name)
            yield LabelledTextArea("Description", desc="Markdown is supported")

            with Container(classes="right-align btn-cont"):
                yield Button("Preview", variant="primary")

            yield Label("Testcases", classes="label-testcase")
            if len(self.testcases) == 0:
                with Container(classes="center-align"):
                    yield Label("No testcases added yet", classes="no-testcases")
            else:
                for testcase in self.testcases:
                    yield testcase
            with Container(classes="right-align btn-cont"):
                yield Button("+", variant="primary", id="add-testcase", tooltip="Add a new testcase")

    def on_mount(self) -> None:
        self.title = "Create Testcase"

    def on_button_pressed(self, event: Button.Pressed) -> None:
        if event.button.id == "add-testcase":
            self.testcases = self.testcases + [TestcaseUnit()]


if __name__ == "__main__":
    app = CreateTestcaseUI()
    app.run()
