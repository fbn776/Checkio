from flask import Blueprint

submitRoute = Blueprint('submit', __name__)


@submitRoute.get('/')
def list_submissions():
    return "List submissions"