from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship

from core.db.db import Base


class Group(Base):
    """Represents a group created by the user"""
    __tablename__ = "groups"

    id = Column(String, primary_key=True)
    created_by = Column(String, ForeignKey('users.username'))
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User")
