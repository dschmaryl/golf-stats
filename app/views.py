from flask import flash, redirect, render_template, url_for
from flask_login import login_required

from app import app, db, login_manager
from .forms import LoginForm
from .models import User


@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500


@login_manager.user_loader
def load_user(id):
    return User.get(id)


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        login_user(user, remember=True)
        flash('logged in')
        return redirect(url_for('index'))
    return render_template('login.html', form=form)


@app.route('/logout', methods=['GET'])
def logout():
    user = current_user
    user.authenticated = False
    db.session.add(user)
    db.session.commit()
    logout_user()
    return redirect(url_for('index'))


@app.route('/new_score')
@login_required
def new_score():
    # temporary
    return redirect(url_for('index'))
