from flask import request, jsonify, g
import jwt
from functools import wraps

from core.global_store import get_value


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Invalid or missing token!"}), 401

        token = auth_header.split(" ")[1]  # Extract token after 'Bearer '

        try:
            decoded_token = jwt.decode(token, get_value("token_secret"), algorithms=["HS256"])
            g.user = decoded_token  # Store user info in Flask's g object
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired!"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token!"}), 401

        return f(*args, **kwargs)
    return decorated