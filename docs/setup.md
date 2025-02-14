# Setup

## Requirements

- [Python](https://www.python.org/downloads/) - A popular programming language that is reliable, flexible, easy to
  learn.
- [uv](https://docs.astral.sh/uv/getting-started/installation/) - is a fast package manager for Python, an alternative
  to pip and pipenv, designed for speed and efficiency.

> [!NOTE]
> The project is mainly intended for Unix based systems. The project might not work as expected in Windows.

## Installation

1. Clone the repository
    ```bash
    git clone <repo-url>
    ```
    Or download the zip file and extract it.
2. Change the directory to the project folder
    ```bash
    cd <project-folder>
    ```
3. Install the dependencies
    ```bash
    uv pip install -e .
    ```
4. Setup DB
    ```bash
    uv run src/core/db/schema.py
    ```
5. Run the project
    ```bash
    uv run python3 src/main.py
    ```
   > The above might only work for Unix based systems. For Windows, you can use `python src/main.py` or `py src/main.py`.
6. For usage like a cli tool use
    ```bash
    uv pip install -e .
    ```
   This will install the package in editable mode, so you can run the tool from anywhere in the terminal.
   > This currently only works for Unix based systems.
