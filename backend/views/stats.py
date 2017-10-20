from flask import g, redirect, render_template, url_for
from flask_login import login_required

from backend import app
from backend.models import User
from .users import check_user


@app.route('/user/<username>/stats')
@login_required
def stats(username):
    if not check_user(username):
        return redirect(url_for('stats', username=g.user.username))

    user = User.query.filter_by(username=username).first()
    seasons = [s for s in [2017, 2016, 2015] if user.get_season_rounds(s)]
    title = 'stats for ' + username
    return render_template('stats.html', user=user, seasons=seasons,
                           title=title)
