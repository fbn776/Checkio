from flask import Blueprint, request, jsonify, g
from core.db.db import get_db
from core.db.models.Group import Group
from web.backend.middleware.token_required import token_required

groupRoute = Blueprint('group', __name__)


@groupRoute.post('/')
@token_required
def create_group():
    data = request.get_json()
    name = data.get('id')

    if not name:
        return jsonify({"error": "Group ID is required"}), 400
    try:
        db = next(get_db())
        group = Group(id=name, created_by=g.user['username'])
        db.add(group)
        db.commit()

        return jsonify({"message": "Group created successfully", "data": {
            "id": group.id,
            "created_by": group.created_by,
            "created_at": group.created_at
        }}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to create group"}), 400


@groupRoute.get('/')
@token_required
def list_groups():
    keyword = request.args.get('keyword') or ""

    db = next(get_db())

    groups = db.query(Group).filter(
        Group.created_by == g.user["username"],
        Group.id.ilike(f"%{keyword}%")
    ).all()

    return jsonify([{
        "id": group.id,
        "created_by": group.created_by,
        "created_at": group.created_at
    } for group in groups]), 200


@groupRoute.get('/all')
def list_all_groups():
    db = next(get_db())
    groups = db.query(Group).all()
    return jsonify([{
        "id": group.id,
        "created_by": group.created_by,
        "created_at": group.created_at
    } for group in groups]), 200


@groupRoute.put('/<id>')
@token_required
def update_group(id):
    data = request.get_json()
    name = data.get('id')

    if not name:
        return jsonify({"error": "Group ID is required"}), 400
    try:
        db = next(get_db())
        group = db.query(Group).filter_by(id=id, created_by=g.user["username"]).first()

        if not group:
            return jsonify({"error": "Group not found"}), 404

        group.id = name
        db.commit()
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400

    return jsonify({"message": "Group updated successfully"}), 200

@groupRoute.delete('/<id>')
@token_required
def delete_group(id):
    db = next(get_db())
    group = db.query(Group).filter_by(id=id, created_by=g.user["username"]).first()

    if not group:
        return jsonify({"error": "Group not found"}), 404

    db.delete(group)
    db.commit()

    return jsonify({"message": "Group deleted successfully"}), 200
