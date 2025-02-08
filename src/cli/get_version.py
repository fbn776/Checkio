from importlib.metadata import version


def get_version():
    try:
        # Get the version of the 'checkio' package
        current_version = version("checkio")
        print(f"Current version of checkio: {current_version}")
    except Exception as e:
        print(f"Error: {e}")
        print("Unable to get the version of checkio")
        print("Please make sure the package is installed")
        print("You can install the package using the command: pip install checkio")
        print("If the package is already installed, please report the issue at")