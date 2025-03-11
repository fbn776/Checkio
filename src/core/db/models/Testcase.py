from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey, PrimaryKeyConstraint, JSON, UniqueConstraint
from sqlalchemy.orm import relationship, validates

from core.db.db import Base
from core.global_store import get_value

id_split_delimiter = get_value("id_delimiter")


class Testcase(Base):
    """Represents a testcase in the database"""
    __tablename__ = "testcases"

    # The actual ID of the testcase
    main_id = Column(Integer, primary_key=True, autoincrement=True)
    created_by = Column(String, ForeignKey('users.username'))

    group_id = Column(String, ForeignKey('groups.id'))
    # This is just the title or id of the testcase; not the unique identifier
    id = Column(String)
    title = Column(String)
    description = Column(String)
    data = Column(JSON)
    created_at = Column(DateTime, server_default=func.now())

    __table_args__ = (UniqueConstraint("group_id", "id", name="uq_group_id_testcase_id"),)

    user = relationship("User")
    group = relationship("Group")

    @validates("id")
    def validate_id(self, key, value):
        if id_split_delimiter in value:
            raise ValueError(f"Testcase ID cannot contain {id_split_delimiter}")
        return value