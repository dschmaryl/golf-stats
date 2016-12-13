from flask import render_template

from app import app, db, lm
from .models import User


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')
