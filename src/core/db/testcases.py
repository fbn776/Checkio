import getpass
import json
from typing import List

from core.db.db import get_db


def create_testcase(group_id: str, testcase_id: str, title: str, description: str, body: List[dict]):
    try:
        from core.db.db import get_db
        db = next(get_db())

        from core.db.models.Group import Group
        if db.query(Group).filter_by(id=group_id, created_by=getpass.getuser()).all() is None:
            return {"error": "Group ID doesn't exists"}, 400

        from core.db.models.Testcase import Testcase
        testcase = Testcase(
            group_id=group_id,
            id=testcase_id,
            title=title,
            description=description,
            data=json.dumps(body),
            created_by=getpass.getuser(),
        )

        db.add(testcase)
        db.commit()
    except Exception as e:
        raise


def get_testcases():
    with (next(get_db()) as session):
        from core.db.models.Testcase import Testcase
        from core.db.models.Group import Group
        testcases = session.query(Testcase).join(Group, Testcase.group_id == Group.id).order_by(
            Testcase.created_at.desc()).limit(5)

        return [{
            "_id": testcase.main_id,
            "group_id": testcase.group_id,
            "id": testcase.id,
            "title": testcase.title,
            "description": testcase.description,
            "data": testcase.data,
            "created_at": testcase.created_at,
        } for testcase in testcases]


def get_testcase_by_id(t_id, group_id):
    with next(get_db()) as session:
        from core.db.models.Testcase import Testcase

        testcase = (
            session.query(Testcase).filter(Testcase.group_id == group_id, Testcase.id == t_id)
            .first()
        )

        return {
            "_id": testcase.main_id,
            "group_id": testcase.group_id,
            "id": testcase.id,
            "title": testcase.title,
            "description": testcase.description,
            "data": testcase.data,
            "created_at": testcase.created_at
        }
