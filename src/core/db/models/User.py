from sqlalchemy import Column, String, DateTime, func, CheckConstraint
from core.db.db import Base


class User(Base):
    """Represents a user in the database"""
    __tablename__ = "users"

    username = Column(String, index=True, primary_key=True)
    password = Column(String)
    role = Column(String, default="faculty", nullable=False)

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    __table_args__ = (CheckConstraint("role IN ('admin', 'faculty')", name="valid_roles"),)


