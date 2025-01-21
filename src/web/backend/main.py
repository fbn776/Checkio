from flask import Flask

app = Flask(__name__)

@app.get('/is-alive')
def is_alive():
    return 'yes'