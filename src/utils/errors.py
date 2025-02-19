
class DontContinue(Exception):
    """A Don't continue error"""
    def __init__(self, message="Don't continue"):
        self.message = message
        super().__init__(self.message)

class CompilationError(Exception):
    """A Compilation error"""
    def __init__(self, message="Compilation error"):
        self.message = message
        super().__init__(self.message)

class ConfigFileNotFoundError(Exception):
    """A Config file not found error"""
    def __init__(self, message="Config file not found"):
        self.message = message
        super().__init__(self.message)

class InvalidConfigFile(Exception):
    """An Invalid config file error"""
    def __init__(self, message="Invalid config file"):
        self.message = message
        super().__init__(self.message)