from flask import flash, g, redirect, render_template, request, url_for
from flask_login import login_user, logout_user

from golf_stats import app
from golf_stats.models import User
from golf_stats.forms import LoginForm
from .flash_errors import flash_errors


@app.route('/login', methods=['GET', 'POST'])
def login():
    if g.user is not None and g.user.is_authenticated:
        return redirect(url_for('index'))

    form = LoginForm(request.form)

    if request.method == 'POST':
        if form.validate():
            user = User.query.filter_by(username=form.username.data).first()
            if user:
                if user.check_password(form.password.data):
                    login_user(user, remember=True)
                else:
                    flash('incorrect password')
                    return redirect(url_for('login'))
            else:
                flash('username not found')
                return redirect(url_for('login'))
            return redirect(url_for('stats', username=g.user.username))
        else:
            flash_errors(form)

    return render_template('login.html', title='log in',
                           form=form)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))
