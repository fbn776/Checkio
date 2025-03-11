import json

from flask import Blueprint, request, g
from pydantic import ValidationError
from rich.console import Console
from sqlalchemy.exc import IntegrityError
from core.db.db import get_db
from core.db.models.Group import Group
from core.db.models.Testcase import Testcase
from core.db.models.User import User
from utils.pydantic_models import TestCaseObj
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


"""
{
  "group_id": "string",
  "id": "string",
  "title": "string",
  "description": "string",
  "data": [
    {
      "output": "string",
      "input": "string",
      "hidden": "boolean",
      "cli_args": [
        "string"
      ],
      "files": [
        {
          "name": "string",
          "content": "string"
        }
      ]
    }
  ]
}
"""

console = Console()

@testcaseRoute.post('/')
@token_required
def create_testcase():
    try:
        body = request.get_json()
        testcase = TestCaseObj(**body)


        group_id = testcase.group_id
        id = testcase.id
        title = testcase.title
        description = testcase.description
        data = testcase.data

        print(testcase.group_id, testcase.id, testcase.title, testcase.description, testcase.data)

        if len(data) == 0:
            return {"error": "No testcase unit specified"}, 400

        try:
            db = next(get_db())

            if db.query(Group).filter_by(id=group_id, created_by=g.user["username"]).all() is None:
                return {"error": "Group ID doesn't exists"}, 400

            testcase = Testcase(group_id=group_id, id=id, title=title, description=description, data=json.dumps(body.get('data')))

            db.add(testcase)
            db.commit()
        except IntegrityError as e:
            print(e)
            return {"message": "Testcase already exits or group ID doesn't exits"}, 400
        except Exception as e:
            print(e)
            console.print_exception(show_locals=True)
            return {"message": "An error occurred while creating the testcase"}, 500

        return {"message": "Testcase created successfully"}, 200
    except ValidationError as e:
        # str = ', '.join([error['loc'][0] for error in e.errors()])
        for error in e.errors():
            print(f"Field: {'.'.join(map(str, error['loc']))} - Error: {error['msg']}")


        return {"message": f"Missing Data"}, 400

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
