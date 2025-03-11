from sqlalchemy import String, DateTime, func
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from core.db.db import Base


class Submission(Base):
    """Represents a submission made by the user"""
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    group_id = Column(String, ForeignKey('groups.id', ondelete="CASCADE", onupdate="CASCADE"))
    testcase_id = Column(String, ForeignKey('testcases.main_id', ondelete="CASCADE", onupdate="CASCADE"))
    submitted_by = Column(String)

    # See docs/data-structures.md for the structure of the submitted_files
    submitted_files = Column(String, default="[]")

    created_at = Column(DateTime, server_default=func.now())

    testcase = relationship("Testcase")
