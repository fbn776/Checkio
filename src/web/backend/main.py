import logging
import os

import click
from flask import Flask, render_template, request
from flask_cors import CORS

from utils.get_local_ip import get_local_ip

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.get('/is-alive')
def is_alive():
    return 'yes'

testcases_data = [
    {
        "name": "Hello",
        "description": "This is a hello world test case",
    },
    {
        "name": "Hahah",
        "description": "This is a hello world test case",
    },
    {
        "name": "Wot thenga",
        "description": "cffyugioklmnbgvtfhy67 uy78uoik",
    },
    {
        "name": "Hehehehe",
        "description": "aedfghj dfghj",
    }
]

@app.get('/testcases')
def testcases():
    return testcases_data

@app.post('/delete')
def delete():
    data = request.json
    temp = [item for item in testcases_data if item["name"] != data["name"]]

    print("DELETED:", data)
    print("TEMP:", temp)

    testcases_data.clear()
    testcases_data.extend(temp)

    print(data)
    return 'deleted'


def run_server(port = 5000):
    # Suppress Flask logs
    log = logging.getLogger("werkzeug")
    log.setLevel(logging.ERROR)
    click.echo = lambda *args, **kwargs: None

    app.run(host="0.0.0.0", port=port, debug=False, use_reloader=False, )


# Example CLI command
if __name__ == "__main__":
    run_server()
    input("Press Enter to exit...\n")