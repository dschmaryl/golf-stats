from flask import g, redirect, url_for

from backend import app


@app.route('/index')
@app.route('/user/')
@app.route('/')
def index():
    if g.user is not None and g.user.is_authenticated:
        return redirect(url_for('stats', username=g.user.username))
    else:
        return redirect(url_for('login'))
