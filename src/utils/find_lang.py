from typing import Literal


def find_lang(file_name: str) -> Literal["c", "py", "java", None]:
    """
    Find the language of the file
    :param file_name: The name of the file
    :return: The language of the file
    """
    ext = file_name.split(".")[-1]
    if ext == "c":
        return "c"
    if ext == "py":
        return "py"
    if ext == "java":
        return "java"
    return None

