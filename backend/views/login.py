from flask import flash, g, redirect, render_template, request, url_for
from flask_login import login_user, logout_user

from backend import app
from backend.models import User
from backend.forms import LoginForm
from .flash_errors import flash_errors


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm(request.form)

    if request.method == 'POST':
        if form.validate():
            if form.register.data:
                return redirect(url_for('user_new'))

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

            if request.args.get('next') == '/react':
                return redirect(url_for('react'))
            else:
                return redirect(url_for('stats', username=g.user.username))
        else:
            flash_errors(form)

    return render_template('login.html', title='login',
                           form=form)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))
