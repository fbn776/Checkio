import logging
import os
import time

import click
from flask import Flask, render_template, send_from_directory, abort, request, jsonify
from flask_cors import CORS

from core.global_store import get_value
from web.backend.routes.auth import auth

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///store.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route("/")
def home():
    return render_template("index.html")


ALLOWED_EXTENSIONS = {".js", ".css", ".svg", ".png", ".jpg"}


def is_safe_file(filename):
    _, ext = os.path.splitext(filename)
    return ext in ALLOWED_EXTENSIONS


@app.route('/assets/<path:filename>')
def serve_assets(filename):
    if not is_safe_file(filename):
        abort(403)  # Forbidden if file type is not allowed
    return send_from_directory(os.path.join(app.root_path, 'templates/assets'), filename)


@app.get('/is-alive')
def is_alive():
    return jsonify({
        "status": "alive",
        "serverTime": time.time(),
    })

app.register_blueprint(auth, url_prefix='/auth')


def run_server(port=get_value("port"), dev_mode = False):
    if dev_mode:
        app.run(host="0.0.0.0", port=port, debug=True, use_reloader=True)
    else:
        # Suppress Flask logs
        log = logging.getLogger("werkzeug")
        log.setLevel(logging.ERROR)
        click.echo = lambda *args, **kwargs: None

        app.run(host="0.0.0.0", port=port, debug=False, use_reloader=False)


# Example CLI command
if __name__ == "__main__":
    run_server(dev_mode=True)
    input("Press Enter to exit...\n")
