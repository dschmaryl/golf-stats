from flask import render_template
from golf_stats import app


@app.route('/index')
@app.route('/user/')
@app.route('/')
def index():
    return render_template('index.html')
