from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship, validates
from core.db.db import Base
from core.global_store import get_value

id_split_delimiter = get_value("id_delimiter")


class Group(Base):
    """Represents a group created by the user"""
    __tablename__ = "groups"

    id = Column(String, primary_key=True)
    created_by = Column(String, ForeignKey('users.username', ondelete="CASCADE", onupdate="CASCADE"))
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User")

    @validates("id")
    def validate_id(self, key, value):
        print(id_split_delimiter)
        if id_split_delimiter in value:
            raise ValueError(f"Testcase ID cannot contain {id_split_delimiter}")
        return value
