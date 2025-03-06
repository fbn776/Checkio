from flask import Blueprint, request, jsonify
import jwt
import datetime
from core.db.db import get_db
from core.db.models.User import User
from utils.hashing import check_password_hash

# Secret key for JWT
token_secret = "your_secret_key"

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
        }, token_secret, algorithm="HS256")

        return jsonify({"message": "Login successful", "token": token}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401
