from flask import g, render_template
from flask_login import current_user, login_required

from app import app, login_manager
from app.models import User


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


@app.before_request
def before_request():
    g.user = current_user


@app.route('/user/<username>')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first()
    title = 'stats for ' + username
    return render_template('user.html', user=user, title=title)
