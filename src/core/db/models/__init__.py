"""
Database models package - imports all models in the correct order to ensure
relationship resolution works properly.
"""

# Import models in order of dependency
# User has no dependencies on other models
from core.db.models.User import User

# Group depends on User
from core.db.models.Group import Group

# Testcase depends on User and Group
from core.db.models.Testcase import Testcase

# Submission depends on Testcase
from core.db.models.Submission import Submission

# Evaluation depends on User and Submission
from core.db.models.Evaluation import Evaluation, EvalGroup

__all__ = [
    "User",
    "Group",
    "Testcase",
    "Submission",
    "Evaluation",
    "EvalGroup",
]

