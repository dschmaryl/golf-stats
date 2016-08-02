from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return 'soon to be golf-stats on flask'
