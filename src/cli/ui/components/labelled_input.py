from typing import Literal
from textual.widget import Widget
from textual.widgets import TextArea, Label, Input


class LabelledInput(Widget):
    DEFAULT_CSS = """
    LabelledInput {
        height: auto;
        margin: 0 1;
        padding: 1 0;
    }
    Label {
        margin-bottom: 1;
        margin-left: 1;
        text-style: bold;
    }
    """

    def __init__(self, label_text: str, input_value = "", placeholder: str = "", input_type: Literal["integer", "number", "text"]= "text", **kwargs):
        super().__init__(**kwargs)
        self.input_value = input_value
        self.text_input = Input(placeholder=placeholder, type=input_type)
        self.label_text = label_text

    def get_value(self):
        """Returns the value of the text area"""
        return self.text_input.value

    def on_mount(self) -> None:
        self.text_input.value = self.input_value

    def compose(self):
        label = Label(self.label_text)

        yield label
        yield self.text_input
