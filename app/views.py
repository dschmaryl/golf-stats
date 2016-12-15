import flask
import flask_login

from app import app, bcrypt, db, login_manager
from .models import Course, Round, User


@app.errorhandler(404)
def not_found_error(error):
    return flask.render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return flask.render_template('500.html'), 500


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


@app.before_request
def before_request():
    flask.g.user = flask_login.current_user


@app.route('/')
@app.route('/index')
def index():
    return flask.render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if flask.g.user is not None and flask.g.user.is_authenticated:
        return flask.redirect(flask.url_for('index'))

    if flask.request.method == 'POST':
        users = User.query.filter_by(username=flask.request.form['username'])
        user = users.first()
        if user:
            password = flask.request.form['password']
            if bcrypt.check_password_hash(user.password, password):
                flask_login.login_user(user, remember=True)
            else:
                flask.flash('incorrect password')
        else:
            flask.flash('username not found')
        return flask.redirect(flask.url_for('index'))

    return flask.render_template('login.html', title='log in',
                                 form=flask.request.form)


@app.route('/logout', methods=['GET'])
def logout():
    flask_login.logout_user()
    return flask.redirect(flask.url_for('index'))


def db_save(data):
    db.session.add(data)
    db.session.commit()


@app.route('/user/<username>')
@flask_login.login_required
def user(username):
    title = 'stats for ' + username
    return flask.render_template('user.html', username=username, title=title)


@app.route('/user/<username>/round_list')
@flask_login.login_required
def round_list(username):
    user = User.query.filter_by(username=username).first()
    rounds = Round.query.filter_by(user_id=user.id)
    return flask.render_template('round_list.html', rounds=rounds,
                                 title='rounds')


@app.route('/user/<username>/round_new', methods=['GET', 'POST'])
@flask_login.login_required
def round_new(username):
    if flask.request.method == 'POST':
        new_round = Round(nickname=flask.request.form['date'],
                            tee_color=flask.request.form['tee_color'])
        db_save(new_round)
        flask.flash('added round %i' % round_.id)
        return flask.redirect(flask.url_for('round_list'))

    return flask.render_template('round_new.html', title='new round',
                                 username=username, form=flask.request.form)


@app.route('/user/<username>/round_edit/<round_id>', methods=['GET', 'POST'])
@flask_login.login_required
def round_edit(username, round_id):
    round_ = Round.query.get(round_id)
    if flask.request.method == 'POST':
        round_.date = flask.request.form['date']
        round_.course = flask.request.form['name']
        db_save(round_)
        flask.flash('saved round %i' % round_.id)
        return flask.redirect(flask.url_for('course_list'))

    return flask.render_template('round_edit.html', title='edit round',
                                 form=flask.request.form, round=round_)


@app.route('/course_list')
@flask_login.login_required
def course_list():
    courses = Course.query.all()
    return flask.render_template('course_list.html', title='courses',
                                 courses=courses)


@app.route('/course_new', methods=['GET', 'POST'])
@flask_login.login_required
def course_new():
    if flask.request.method == 'POST':
        new_course = Course(nickname=flask.request.form['nickname'],
                            name=flask.request.form['name'])
        db_save(new_course)
        return flask.redirect(flask.url_for('course_list'))

    return flask.render_template('course_new.html', title='new course',
                                 form=flask.request.form)


@app.route('/course_edit/<course>', methods=['GET', 'POST'])
@flask_login.login_required
def course_edit(course):
    course = Course.query.filter_by(nickname=course).first()

    if flask.request.method == 'POST':
        course.nickname = flask.request.form['nickname']
        course.name = flask.request.form['name']
        db_save(course)
        flask.flash('saved %s' % course.nickname)
        return flask.redirect(flask.url_for('course_list'))

    return flask.render_template('course_edit.html', title='edit course',
                                 form=flask.request.form, course=course)
