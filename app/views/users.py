from flask import flash, g, render_template, redirect, request, url_for
from flask_login import current_user, login_required

from app import app, db, login_manager, TEES
from app.models import User
from app.forms import ChangePasswordForm, UserForm
from .flash_errors import flash_errors


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


@app.route('/user/<username>/change_password', methods=['GET', 'POST'])
@login_required
def change_password(username):
    user = User.query.filter_by(username=username).first()
    form = ChangePasswordForm(request.form)

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled password change')
            return redirect(url_for('index'))

        if form.validate():
            if user.check_password(form.old_password.data):
                user.set_password(form.new_password.data)
                db.session.commit()
                flash('password changed')
                return redirect(url_for('index'))
            else:
                flash('old password is incorrect')
            return redirect(url_for('change_password', username=username))
        else:
            flash_errors(form)

    return render_template('change_password.html', username=username,
                           title='change password', form=form)


@app.route('/user_new', methods=['GET', 'POST'])
def user_new():
    form = UserForm(request.form)

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled new user registration')
            return redirect(url_for('index'))

        if form.validate():
            user = User(username=form.username.data)
            user.set_password(form.password.data)
            user.default_tees = TEES[form.default_tees.data]

            flash('user %s added' % user.username)
            return redirect(url_for('user', username=user.username))
        else:
            flash_errors(form)

    return render_template('user_new.html', title='new user', form=form)
