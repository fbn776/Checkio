from flask import Blueprint, request, g, jsonify
from core.db.db import get_db
from core.db.models.Submission import Submission
from core.db.models.Testcase import Testcase
from web.backend.middleware.token_required import token_required

submitRoute = Blueprint('submissions', __name__)


@submitRoute.get('/all')
@token_required
def all():
    return jsonify({
        "error": "Please provide a group_id or testcase_id"
    }), 200

    """
    Returns all the submissions belonging to the test cases created by the user requesting
    """
    group_id = request.args.get('group_id')
    testcase_id = request.args.get('testcase_id')
    user = g.user["username"]

    db = next(get_db())

    # Query test cases created by the user
    query = db.query(Testcase.main_id).filter(Testcase.created_by == user)

    # Filter by group_id if provided
    if group_id:
        query = query.filter(Testcase.group_id == group_id)

    # Filter by specific testcase_id if provided
    if testcase_id:
        query = query.filter(Testcase.id == testcase_id)

    testcase_ids = [tc.main_id for tc in query.all()]

    # Fetch submissions linked to the test cases created by the user
    submissions = db.query(Submission).filter(Submission.testcase_id.in_(testcase_ids)).all()

    return jsonify([{
        "id": sub.id,
        "group_id": sub.group_id,
        "testcase_id": sub.testcase_id,
        "submitted_by": sub.submitted_by,
        "submitted_files": sub.submitted_files,
        "created_at": sub.created_at
    } for sub in submissions])



