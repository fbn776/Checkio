from sqlalchemy import Column, Integer, String, DateTime, func
from core.db.db import Base


class User(Base):
    """Represents a user in the database"""
    __tablename__ = "users"

    username = Column(String, index=True, primary_key=True)
    password = Column(String)
    created_at = Column(DateTime, server_default=func.now())

