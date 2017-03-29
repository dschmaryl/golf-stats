from flask import g, redirect, render_template, request, url_for
from flask_login import login_user, logout_user

from app import app
from app.models import User


@app.route('/login', methods=['GET', 'POST'])
def login():
    if g.user is not None and g.user.is_authenticated:
        return redirect(url_for('index'))

    if request.method == 'POST':
        user = User.query.filter_by(username=request.form['username']).first()
        if user:
            if user.check_password(request.form['password']):
                login_user(user, remember=True)
            else:
                flash('incorrect password')
                return redirect(url_for('login'))
        else:
            flash('username not found')
            return redirect(url_for('login'))
        return redirect(url_for('user', username=g.user.username))

    return render_template('login.html', title='log in',
                           form=request.form)


@app.route('/logout', methods=['GET'])
def logout():
    logout_user()
    return redirect(url_for('index'))
