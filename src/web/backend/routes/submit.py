from flask import Blueprint, request, g, jsonify
from rich.pretty import pprint
from sqlalchemy import text

from core.db.db import get_db
from core.db.models.Submission import Submission
from core.db.models.Testcase import Testcase
from web.backend.middleware.token_required import token_required

submitRoute = Blueprint('submission', __name__)


from rich.console import Console
console = Console()

@submitRoute.get('/')
@token_required
def all():
    """
    Returns all the submissions belonging to the test cases created by the user requesting
    """
    group_id = request.args.get('group_id')
    testcase_id = request.args.get('testcase_id')

    user = g.user["username"]

    db = next(get_db())

    data = (
        db.query(Submission)
        .join(Testcase, Submission.testcase_id == Testcase.main_id)
        .filter(Testcase.created_by == user)
    )

    if group_id:
        data = data.filter(Submission.group_id == group_id)

    if testcase_id:
        data = data.order_by(Submission.testcase_id)

    data = data.all()

    return jsonify([{
        "id": submission.id,
        "testcase_id": submission.testcase_id,
        "submitted_by": submission.submitted_by,
        "submitted_files": submission.submitted_files,
        "created_at": submission.created_at
    } for submission in data]), 200


