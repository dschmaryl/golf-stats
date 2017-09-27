from flask import flash, g, render_template, redirect, request, url_for
from flask_login import current_user, login_required

from golf_stats import app, db, login_manager
from golf_stats.models import User
from golf_stats.forms import ChangePasswordForm, UserForm
from golf_stats.actions import create_user, update_user
from .flash_errors import flash_errors
from .tees import TEES


def check_user(username, return_url='/stats'):
    if g.user.username == username:
        return True
    else:
        flash('wrong user!')
        return False


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


@app.before_request
def before_request():
    g.user = current_user


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


@app.route('/user/<username>/change_password', methods=['GET', 'POST'])
@login_required
def change_password(username):
    if not check_user(username):
        return redirect(url_for('change_password', username=g.user.username))

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


@app.route('/user/<username>/settings', methods=['GET', 'POST'])
@login_required
def user(username):
    if not check_user(username):
        return redirect(url_for('user', username=g.user.username))

    user = User.query.filter_by(username=username).first()
    form = UserForm(request.form, obj=user)
    form.default_tees.choices = [(i, TEES[i]) for i in range(len(TEES))]

    if request.method == 'POST':
        if form.cancel.data:
            return redirect(url_for('index'))

        if form.validate():
            result = update_user({
                'username': form.username.data,
                'password': form.password.data,
                'default_tees': TEES[int(request.form.get('default_tees'))]
            })
            if result.get('error'):
                flash(result['error'])
                return redirect(url_for('user'))
            else:
                flash('settings saved')
                return redirect(url_for('index'))
        else:
            flash_errors(form)

    return render_template('user.html', title='settings', form=form)


@app.route('/user/new/', methods=['GET', 'POST'])
def user_new():
    form = UserForm(request.form)
    form.default_tees.choices = [(i, TEES[i]) for i in range(len(TEES))]

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled new user registration')
            return redirect(url_for('index'))

        if form.validate():
            result = create_user({
                'username': form.username.data,
                'password': form.password.data,
                'default_tees': TEES[int(request.form.get('default_tees'))]
            })
            if result.get('error'):
                flash(result['error'])
                return redirect(url_for('user_new'))
            else:
                flash('added user %s' % form.username.data)
                return redirect(url_for('login'))
        else:
            flash_errors(form)

    return render_template('user.html', title='new user', form=form)
