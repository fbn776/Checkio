import json

from flask import Blueprint, request, jsonify, g
from rich.pretty import pprint

from core.db.db import get_db
from core.db.models.Evaluation import EvalGroup, Evaluation
from core.db.models.Submission import Submission
from core.eval.handle_eval import handle_eval
from web.backend.middleware.token_required import token_required

evalRoute = Blueprint('eval', __name__)


def get_pass_percent(evals):
    total = 0
    passed = 0
    for eval in evals:
        data = json.loads(eval.data)
        for tests in data.get("tests", []):
            if tests.get("passed"):
                passed += 1
            total += 1

    return {"passed": passed, "total": total}


@evalRoute.get('/')
@token_required
def get_eval():
    db = next(get_db())
    eval_groups = db.query(EvalGroup).all()

    eval_data = [{
        "id": group.id,
        "name": group.name,
        "count": len(group.evaluations),
        "pass_percent": get_pass_percent(group.evaluations),
        "eval": [{
            "id": eval.id,
            "created_by": eval.created_by,
            "submission_id": eval.submission_id,
            "submitted_by": eval.submission.submitted_by,
            "data": json.loads(eval.data),
            "created_at": eval.created_at,
            "status": eval.status,
            "pass_percent": get_pass_percent([eval]),
        } for eval in group.evaluations]
    } for group in eval_groups]

    pass_percent = {
        "passed": 0,
        "total": 0
    }

    # Calc total pass percent
    for group in eval_groups:
        data = get_pass_percent(group.evaluations)
        pass_percent["passed"] += data["passed"]
        pass_percent["total"] += data["total"]

    return jsonify({
        "evals": eval_data,
        "pass_percent": pass_percent,
    }), 200


@evalRoute.get('/<id>')
@token_required
def get_eval_by_id(id):
    db = next(get_db())
    group = db.query(EvalGroup).filter_by(id=id).first()

    if group is None:
        return jsonify({
            "error": "Evaluation group not found"
        }), 404

    return jsonify({
        "id": group.id,
        "name": group.name,
        "pass_percent": get_pass_percent(group.evaluations),
        "eval": [{
            "id": eval.id,
            "created_by": eval.created_by,
            "submission_id": eval.submission_id,
            "submitted_by": eval.submission.submitted_by,
            "data": eval.data,
            "created_at": eval.created_at,
            "status": eval.status,
            "pass_percent": get_pass_percent([eval]),
        } for eval in group.evaluations]
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
        name: <name of eval group>,
        submissions: [<id of submission>]
    }
    """
    body = request.get_json()

    name = body.get("name")

    if name is None:
        return jsonify({
            "error": "Name is required"
        }), 400

    db = next(get_db())
    new_group = EvalGroup(name=name)
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
