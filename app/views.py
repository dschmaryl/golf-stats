import flask
from flask_login import current_user, login_required, login_user, logout_user

from app import app, db, login_manager
from .forms import LoginForm
from .models import User


@app.errorhandler(404)
def not_found_error(error):
    return flask.render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return flask.render_template('500.html'), 500


@login_manager.user_loader
def load_user(id):
    return User.get(id)


@app.before_request
def before_request():
    flask.g.user = current_user


@app.route('/')
@app.route('/index')
def index():
    return flask.render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    def check_next():
        next = flask.request.args.get('next')
        if not is_safe_url(next):
            return flask.abort(400)
        return flask.redirect(next or flask.url_for('index'))
    if flask.g.user is not None and flask.g.user.is_authenticated:
        return check_next()
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.get(form.username.data)
        if user:
            if bcrypt.check_password_hash(user.password, form.password.data):
                login_user(user, remember=True)
                return check_next()
    return flask.render_template('login.html', title='log in', form=form)


@app.route('/logout', methods=['GET'])
def logout():
    logout_user()
    return flask.redirect(flask.url_for('index'))


@app.route('/new_score')
@login_required
def new_score():
    # form page for adding a new round
    return flask.render_template('new_score.html', title='new score',
                                 form=form)
