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
    from_date = request.args.get('from')
    to_date = request.args.get('to')

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
        data = data.filter(Submission.testcase_id == testcase_id)

    if from_date:
        data = data.filter(Submission.created_at >= from_date)

    if to_date:
        data = data.filter(Submission.created_at <= to_date)

    data = data.all()

    return jsonify([{
        "id": submission.id,
        "group_id": group_id,
        "testcase_id": submission.testcase_id,
        "submitted_by": submission.submitted_by,
        "submitted_files": submission.submitted_files,
        "created_at": submission.created_at
    } for submission in data]), 200


@submitRoute.get('/<submission_id>')
@token_required
def get_submission(submission_id):
    """
    Returns the submission with the given ID
    """
    db = next(get_db())
    submission = db.query(Submission).filter_by(id=submission_id).first()

    if not submission:
        return jsonify({"error": "Submission not found"}), 404

    return jsonify({
        "id": submission.id,
        "testcase_id": submission.testcase_id,
        "submitted_by": submission.submitted_by,
        "submitted_files": submission.submitted_files,
        "created_at": submission.created_at
    }), 200


@submitRoute.delete('/<submission_id>')
@token_required
def delete_submission(submission_id):
    """
    Deletes the submission with the given ID
    """
    try:
        db = next(get_db())
        submission = db.query(Submission).filter_by(id=submission_id).first()

        if not submission:
            return jsonify({"error": "Submission not found"}), 404

        db.delete(submission)
        db.commit()

        return jsonify({"message": "Submission deleted"}), 200
    except Exception as e:
        console.print(e)
        return jsonify({"error": "An error occurred while deleting the submission"}), 500
