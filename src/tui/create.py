import json

def prompt_multiline_input(prompt_message):
    """Prompt the user for multiline input."""
    print(f"{prompt_message} (Press Ctrl+D to finish):")
    lines = []
    try:
        while True:
            line = input()
            lines.append(line)
    except EOFError:
        pass

    print("-----------------------------------")
    return "\n".join(lines)

def create_pgm():
    print("Enter the details of the item below.")
    print("-----------------------------------")

    # Prompt for name
    name = input("Name of the item: ")

    # Prompt for description
    description = prompt_multiline_input("Description")

    # Prompt for input
    input_data = prompt_multiline_input("Input")

    # Prompt for output
    output_data = prompt_multiline_input("Output")

    print("\nSummary of the entered details:")
    print("-----------------------------------")
    print(f"Name: {name}")
    print(f"Description:\n{description}")
    print(f"Input:\n{input_data}")
    print(f"Output:\n{output_data}")

    with open(f"store/{name}.json", "w") as output_file:
        json.dump({
            "name": name,
            "description": description,
            "input": input_data,
            "output": output_data
        }, output_file, indent=4)

    print(f"Item '{name}' has been created.")