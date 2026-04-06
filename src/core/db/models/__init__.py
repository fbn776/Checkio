"""
Database models package - imports all models in the correct order to ensure
relationship resolution works properly.
"""

# Import models in order of dependency
# User has no dependencies on other models
from src.core.db.models.User import User

# Group depends on User
from src.core.db.models.Group import Group

# Testcase depends on User and Group
from src.core.db.models.Testcase import Testcase

# Submission depends on Testcase
from src.core.db.models.Submission import Submission

# Evaluation depends on User and Submission
from src.core.db.models.Evaluation import Evaluation, EvalGroup

__all__ = [
    "User",
    "Group",
    "Testcase",
    "Submission",
    "Evaluation",
    "EvalGroup",
]

