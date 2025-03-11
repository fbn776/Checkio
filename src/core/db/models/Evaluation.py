from sqlalchemy import Column, String, ForeignKey, DateTime, func, Integer
from sqlalchemy.orm import relationship
from core.db.db import Base


class Evaluation(Base):
    """Represents a submission made by the user"""
    __tablename__ = "evaluation"

    # ID of the submission
    id = Column(Integer, primary_key=True, autoincrement=True)

    # This is the user (faculty) who evaluated the submission
    created_by = Column(String, ForeignKey('users.username'))

    # This is the submission that is being evaluated
    submission_id = Column(Integer, ForeignKey('submissions.id'))

    # The evaluation status
    status = Column(String, default="pending")
    pass_percent = Column(Integer, default=0)
    remarks = Column(String, default="No remarks provided")

    # The data of the evaluation in JSON format
    # That is, the result for each testunit of the testcase
    # See /docs/data-structures.md (Evaluation) for the structure of the data
    data = Column(String, default="[]")
    created_at = Column(DateTime, server_default=func.now())

    created_user = relationship("User")
