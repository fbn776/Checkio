from textual.app import App, ComposeResult
from textual.containers import Vertical
from textual.widgets import Input, Static, ListView, ListItem

class FuzzySearchApp(App):
    """A simple in-place fuzzy finder using Textual."""

    CSS = """
    Screen {
        align: center middle;
    }
    ListView {
        width: 50%;
        border: solid white;
    }
    """

    ITEMS = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grapes"]

    def compose(self) -> ComposeResult:
        """Create the UI elements."""
        self.input = Input(placeholder="Search...", id="search_box")
        self.list_view = ListView(*[ListItem(Static(item)) for item in self.ITEMS])
        yield Vertical(self.input, self.list_view)

    def on_mount(self) -> None:
        """Set focus on input box on startup."""
        self.query_one("#search_box").focus()

    def on_input_changed(self, event: Input.Changed) -> None:
        """Filter the list dynamically based on input."""
        query = event.value.lower()
        filtered_items = [item for item in self.ITEMS if query in item.lower()]
        self.list_view.clear()
        self.list_view.extend([ListItem(Static(item)) for item in filtered_items])

    def on_list_view_selected(self, event: ListView.Selected) -> None:
        """Handle item selection and close the app with the selected item."""
        selected_item = event.item.query(Static).first().renderable
        self.exit(selected_item)

def handle_listing():
    app = FuzzySearchApp()
    result = app.run()
    print(f"Selected: {result}")
