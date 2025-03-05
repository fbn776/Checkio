from flask import Blueprint

auth = Blueprint('auth', __name__)

@auth.route('/profile/<username>')
def profile(username):
    return f"Profile page of {username}"
