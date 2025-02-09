from textual.app import App, ComposeResult
from textual.containers import VerticalScroll, Container
from textual.widget import Widget
from textual.widgets import Header, TextArea, Label


class LabelTextAreaComponent(Widget):
    DEFAULT_CSS = """
    LabelTextAreaComponent {
        height: 10;
        margin: 0 1;
    }
    """

    def __init__(self, label_text: str, **kwargs):
        super().__init__(**kwargs)
        self.label_text = label_text

    def compose(self):
            label = Label(self.label_text)
            text_area = TextArea(classes="text-area", language="python", show_line_numbers=True, tab_behavior="indent")

            yield label
            yield text_area


class CreateTestcaseUI(App):
    def __init__(self, name: str = "") -> None:
        self.testcase_name = name
        super().__init__()

    def compose(self) -> ComposeResult:
        yield Header(icon=None)
        yield LabelTextAreaComponent("Enter Text:")


    def on_mount(self) -> None:
        self.title = "Create Testcase"

if __name__ == "__main__":
    app = CreateTestcaseUI()
    app.run()