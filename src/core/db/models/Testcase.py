from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey, PrimaryKeyConstraint, JSON
from sqlalchemy.orm import relationship, validates

from core.db.db import Base
from core.global_store import get_value

id_split_delimiter = get_value("id_delimiter")


class Testcase(Base):
    """Represents a testcase in the database"""
    __tablename__ = "testcases"

    group_id = Column(String, ForeignKey('groups.id'))
    id = Column(String)
    title = Column(String)
    description = Column(String)
    data = Column(JSON)
    created_at = Column(DateTime, server_default=func.now())

    __table_args__ = (PrimaryKeyConstraint("group_id", "id"),)

    group = relationship("Group")

    @validates("id")
    def validate_id(self, key, value):
        if id_split_delimiter in value:
            raise ValueError(f"Testcase ID cannot contain {id_split_delimiter}")
        return value