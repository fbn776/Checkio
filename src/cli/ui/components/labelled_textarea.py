from textual.widget import Widget
from textual.widgets import TextArea, Label, Input


class LabelledTextArea(Widget):
    DEFAULT_CSS = """
    LabelledTextArea {
        height: 13;
        padding: 1 0;
        margin: 0 1;
    }
    
    .muted {
        color: white 40%;
        text-style: italic;
        margin-bottom: 1;
        margin-left: 1;
    }
    """

    def __init__(self, label_text: str, desc: str = None, **kwargs):
        super().__init__(**kwargs)
        self.text_area = TextArea(classes="text-area", language="python", show_line_numbers=True,
                                  tab_behavior="indent")
        if desc:
            self.description = Label(desc, classes="muted")
        else:
            self.description = None

        self.label_text = label_text

    def get_value(self):
        """Returns the value of the text area"""
        return self.text_area.text

    def compose(self):
        yield Label(self.label_text, classes="main-label")
        if self.description:
            yield self.description
        yield self.text_area
