from sqlalchemy import Column, String, ForeignKey, DateTime, func, Integer
from sqlalchemy.orm import relationship
from core.db.db import Base

class Evaluation(Base):
    """Represents a single evaluation for a submission made by the user"""
    __tablename__ = "evaluation"

    id = Column(Integer, primary_key=True, autoincrement=True)
    created_by = Column(String, ForeignKey('users.username', ondelete="CASCADE", onupdate="CASCADE"))
    submission_id = Column(Integer, ForeignKey('submissions.id', ondelete="CASCADE", onupdate="CASCADE"))
    pass_percent = Column(Integer, default=0)

    data = Column(String, default="[]")
    created_at = Column(DateTime, server_default=func.now())

    eval_group_id = Column(Integer, ForeignKey('eval_group.id', ondelete="CASCADE"))
    eval_group = relationship("EvalGroup", back_populates="evaluations")

    created_user = relationship("User")
    submission = relationship("Submission")

class EvalGroup(Base):
    """Represents a group of evaluations created by the user"""
    __tablename__ = "eval_group"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)

    evaluations = relationship("Evaluation", back_populates="eval_group", cascade="all, delete-orphan")
