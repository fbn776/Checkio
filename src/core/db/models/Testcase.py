from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey, PrimaryKeyConstraint, JSON
from sqlalchemy.orm import relationship

from core.db.db import Base

class Testcase(Base):
    """Represents a testcase in the database"""
    __tablename__ = "testcases"

    group_id = Column(String, ForeignKey('groups.id'))
    id = Column(String)
    data = Column(JSON)
    created_at = Column(DateTime, server_default=func.now())

    __table_args__ = (PrimaryKeyConstraint("group_id", "id"),)

    group = relationship("Group")