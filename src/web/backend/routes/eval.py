from flask import Blueprint, request, jsonify, g

from core.db.db import get_db
from core.db.models.Evaluation import EvalGroup, Evaluation
from core.db.models.Submission import Submission
from web.backend.middleware.token_required import token_required

evalRoute = Blueprint('eval', __name__)



@evalRoute.get('/')
def get_eval():
    return jsonify({})



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

    print(body.get("submissions"))

    for submission_id in body.get("submissions"):
        unit_eval = Evaluation(created_by=g.user["username"], eval_group_id=new_group.id, submission_id=submission_id)
        db.add(unit_eval)

    db.commit()
    db.refresh()




    return jsonify({
        "message": "Evaluation created successfully"
    }), 200
