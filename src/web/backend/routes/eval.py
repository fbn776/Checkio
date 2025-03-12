import json

from flask import Blueprint, request, jsonify, g
from rich.pretty import pprint

from core.db.db import get_db
from core.db.models.Evaluation import EvalGroup, Evaluation
from core.db.models.Submission import Submission
from core.eval.handle_eval import handle_eval
from web.backend.middleware.token_required import token_required

evalRoute = Blueprint('eval', __name__)


@evalRoute.get('/')
@token_required
def get_eval():
    db = next(get_db())
    eval_groups = db.query(EvalGroup).all()

    return jsonify([{
        "id": group.id,
        "name": group.name,
        "eval": [{
            "id": eval.id,
            "created_by": eval.created_by,
            "submission_id": eval.submission_id,
            "data": eval.data,
            "created_at": eval.created_at,
            "status": eval.status,
        } for eval in group.evaluations]
    } for group in eval_groups]), 200


@evalRoute.get('/<id>')
@token_required
def get_eval_by_id(id):
    db = next(get_db())
    eval_group = db.query(EvalGroup).filter_by(id=id).first()

    if eval_group is None:
        return jsonify({
            "error": "Evaluation group not found"
        }), 404

    return jsonify({
        "id": eval_group.id,
        "name": eval_group.name,
        "eval": [{
            "id": eval.id,
            "created_by": eval.created_by,
            "submission_id": eval.submission_id,
            "data": eval.data,
            "created_at": eval.created_at,
            "status": eval.status,
        } for eval in eval_group.evaluations]
    }), 200

@evalRoute.get('/unit/<id>')
@token_required
def get_eval_unit_by_id(id):
    db = next(get_db())
    eval = db.query(Evaluation).filter_by(id=id).first()

    if eval is None:
        return jsonify({
            "error": "Evaluation not found"
        }), 404

    return jsonify({
        "id": eval.id,
        "created_by": eval.created_by,
        "submission_id": eval.submission_id,
        "data": eval.data,
        "created_at": eval.created_at,
        "status": eval.status,
    }), 200

@evalRoute.post('/')
@token_required
def create_eval():
    """
    body: {
        submissions: [<id of submission>]
    }
    """
    body = request.get_json()

    db = next(get_db())
    new_group = EvalGroup(name="Mid-Term Evaluations")
    db.add(new_group)
    db.commit()
    db.refresh(new_group)

    for submission_id in body.get("submissions"):
        submission = db.query(Submission).filter_by(id=submission_id).first()

        if submission is None:
            return jsonify({
                "error": "Submission not found"
            }), 404

        # print(submission_id, submission.submitted_files, submission.group_id, submission.testcase_id)

        files = json.loads(submission.submitted_files)

        print("FILE [0] = ", files[0])
        result = handle_eval(files[0], submission.testcase_id, submission.group_id)
        data = {
            "setup_completed": False,
            "error": "Failed to evaluate",
        }

        data = {**data, **result}

        pprint(data)
        status = "failed" if result is None else "success"

        unit_eval = Evaluation(created_by=g.user["username"], eval_group_id=new_group.id, submission_id=submission_id,
                               status=status,
                               data=json.dumps(data)
                               )

        db.add(unit_eval)

    db.commit()

    return jsonify({
        "message": "Evaluation created successfully"
    }), 200
