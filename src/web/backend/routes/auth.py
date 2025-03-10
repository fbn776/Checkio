from flask import Blueprint, request, jsonify, g
import jwt
import datetime
from core.db.db import get_db
from core.db.models.User import User
from core.global_store import get_value
from utils.hashing import check_password_hash
from web.backend.middleware.token_required import token_required

# Create auth Blueprint
auth = Blueprint('auth', __name__)


@auth.post('/login')
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    db = next(get_db())
    user = db.query(User).filter_by(username=username).first()

    if user and check_password_hash(password, user.password):
        token = jwt.encode({
            "username": user.username,
            "role": user.role,
            "exp": datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=1)
        }, get_value("token_secret"), algorithm="HS256")

        return jsonify({"message": "Login successful", "token": token}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401


@auth.get('/test-token')
@token_required
def test_token():
    if not g.user or not g.user.get("username"):
        return jsonify({"message": "Token is invalid"}), 401

    username = g.user.get("username")

    db = next(get_db())
    user = db.query(User).filter_by(username=username).first()

    if not user:
        return jsonify({"message": "Token is invalid"}), 401

    return jsonify({"message": "Token is valid"}), 200

@auth.get('/profile')
@token_required
def profile():
    return jsonify(g.user), 200


