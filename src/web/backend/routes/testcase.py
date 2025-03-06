from flask import Blueprint, request, g
from sqlalchemy.exc import IntegrityError
from core.db.db import get_db
from core.db.models.Group import Group
from core.db.models.Testcase import Testcase
from core.db.models.User import User
from web.backend.middleware.token_required import token_required

testcaseRoute = Blueprint('testcases', __name__)


@testcaseRoute.get('/')
@token_required
def list_testcases():
    with next(get_db()) as session:
        testcases = (
            session.query(Testcase)
            .join(Group, Testcase.group_id == Group.id)
            .join(User, Group.created_by == User.username)
            .filter(User.username == g.user['username'])
            .all()
        )

        return [{
            "group_id": testcase.group_id,
            "id": testcase.id,
            "title": testcase.title,
            "description": testcase.description,
            "data": testcase.data,
            "created_at": testcase.created_at,

        } for testcase in testcases], 200


@testcaseRoute.get('/<id>')
@token_required
def get_testcase(id):
    with next(get_db()) as session:
        testcase = (
            session.query(Testcase)
            .join(Group, Testcase.group_id == Group.id)
            .join(User, Group.created_by == User.username)
            .filter(User.username == g.user['username'], Testcase.id == id)
            .first()
        )

        if not testcase:
            return {"error": "Testcase not found"}, 404

        return {
            "group_id": testcase.group_id,
            "id": testcase.id,
            "title": testcase.title,
            "description": testcase.description,
            "data": testcase.data,
            "created_at": testcase.created_at
        }, 200


@testcaseRoute.post('/')
@token_required
def create_testcase():
    body = request.get_json()

    group_id = body.get('group_id')
    id = body.get('id')
    title = body.get('title')
    description = body.get('description')
    data = body.get('data')

    if not group_id or not id or not title or not description or not data:
        return {"error": "All fields are required - group_id, id, title, description, data"}, 400

    try:
        db = next(get_db())

        if db.query(Group).filter_by(id=group_id, created_by=g.user["username"]).all() is None:
            return {"error": "Group ID doesn't exists"}, 400

        testcase = Testcase(group_id=group_id, id=id, title=title, description=description, data=data)
        db.add(testcase)
        db.commit()
    except IntegrityError:
        return {"error": "Group ID doesn't exists"}, 400
    except Exception as e:
        print(e)
        return {"error": "An error occurred while creating the testcase"}, 500

    return {"message": "Testcase created successfully"}, 200


@testcaseRoute.put('/<id>')
@token_required
def update_testcase(id):
    body = request.get_json()
    testcase_id = body.get('id')
    title = body.get('title')
    description = body.get('description')
    data = body.get('data')

    with next(get_db()) as session:
        testcase = (
            session.query(Testcase)
            .join(Group, Testcase.group_id == Group.id)
            .join(User, Group.created_by == User.username)
            .filter(User.username == g.user['username'], Testcase.id == id)
            .first()
        )

        if not testcase:
            return {"error": "Testcase not found"}, 404

        if testcase_id:
            testcase.id = testcase_id
        if title:
            testcase.title = title
        if description:
            testcase.description = description
        if data:
            testcase.data = data

        session.commit()
        return {"message": "Testcase updated successfully"}, 200


@testcaseRoute.delete('/<id>')
@token_required
def delete_testcase(id):
    with next(get_db()) as session:
        testcase = (
            session.query(Testcase)
            .join(Group, Testcase.group_id == Group.id)
            .join(User, Group.created_by == User.username)
            .filter(User.username == g.user['username'], Testcase.id == id)
            .first()
        )

        if not testcase:
            return {"error": "Testcase not found"}, 404

        session.delete(testcase)
        session.commit()

        return {"message": "Testcase deleted successfully"}, 200
