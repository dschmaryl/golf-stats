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
    seasons = [
        season for season in range(2015, user.get_latest_round().date.year + 1)
        if user.get_season_rounds(season)
    ]
    seasons.reverse()

    title = 'stats summary'
    return render_template('stats.html', user=user, seasons=seasons,
                           title=title)
