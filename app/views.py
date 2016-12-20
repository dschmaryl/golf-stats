import flask
import flask_login

from dateutil.parser import parse

from flask import flash, redirect, render_template, url_for

from app import app, bcrypt, db, login_manager
from .models import Course, Hole, Round, Score, Tee, User


@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


@app.before_request
def before_request():
    flask.g.user = flask_login.current_user


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if flask.g.user is not None and flask.g.user.is_authenticated:
        return redirect(url_for('index'))

    if flask.request.method == 'POST':
        users = User.query.filter_by(username=flask.request.form['username'])
        user = users.first()
        if user:
            password = flask.request.form['password']
            if bcrypt.check_password_hash(user.password, password):
                flask_login.login_user(user, remember=True)
            else:
                flash('incorrect password')
        else:
            flash('username not found')
        return redirect(url_for('index'))

    return render_template('login.html', title='log in',
                           form=flask.request.form)


@app.route('/logout', methods=['GET'])
def logout():
    flask_login.logout_user()
    return redirect(url_for('index'))


@app.route('/user/<username>')
@flask_login.login_required
def user(username):
    title = 'stats for ' + username
    return render_template('user.html', username=username, title=title)


@app.route('/user/<username>/round_list')
@flask_login.login_required
def round_list(username):
    user = User.query.filter_by(username=username).first()
    rounds = Round.query.filter_by(user_id=user.id)
    courses = {}
    for r in rounds:
        course = Course.query.get(r.course_id)
        courses[r.id] = course.nickname
    return render_template('round_list.html', courses=courses, rounds=rounds,
                           title='rounds')


def save_scores(round_id, form):
    for i in range(1, 19):
        hole = 'hole%i' % i
        score = form['%s_score' % hole]
        putts = form['%s_putts' % hole]
        gir_str = '%s_gir' % hole
        if gir_str in form:
            gir = form[gir_str]
        else:
            # need par for the hole to calculate gir from putts
            gir = 2  # temporary

        score = Score(round_id=round_id, hole=hole, score=score, putts=putts,
                      gir=gir)
        db.session.add(score)
    db.session.commit()


def save_round(username, form):
    courses = Course.query.filter_by(nickname=form['course'])
    course = courses.first()
    user = User.query.filter_by(username=username).first()
    if 'tee_color' in form:
        tee_color = form['tee_color']
    else:
        # this is not ideal. fix it. maybe add 'default tee' to user model
        tee_color = 'red' if username == 'kim' else 'white'

    new_round = Round(date=parse(form['date']), user_id=user.id,
                      course_id=course.id, tee_color=tee_color)
    db.session.add(new_round)
    db.session.commit()
    save_scores(new_round.id, form)
    return new_round.id


@app.route('/user/<username>/round_new', methods=['GET', 'POST'])
@flask_login.login_required
def round_new(username):
    holes = ['hole%i' % i for i in range(1, 19)]
    courses = Course.query.all()

    if flask.request.method == 'POST':
        if 'cancel' in flask.request.form:
            flash('canceled new round')
            return redirect(url_for('round_list', username=username))
        round_id = save_round(username, flask.request.form)
        flash('added round %i' % round_id)
        return redirect(url_for('round_list', username=username))

    return render_template('round_new.html', title='new round', holes=holes,
                           courses=courses, username=username,
                           form=flask.request.form)


def update_scores(round_id, form):
    scores = Score.query.filter_by(round_id=round_id)
    for score in scores:
        hole = score.hole
        score.score = form['%s_score' % hole]
        score.putts = form['%s_putts' % hole]
        gir_str = '%s_gir' % hole
        if gir_str in form:
            score.gir = form[gir_str]
        else:
            # need par for the hole to calculate gir from putts
            score.gir = 2  # temporary
    db.session.commit()


def update_round(round_id, form):
    round_ = Round.query.get(round_id)
    round_.date = parse(form['date'])
    if 'course' in form:
        course = Course.query.filter_by(nickname=form['course']).first()
        round_.course_id = course.id
    if 'tee_color' in form:
        round_.tee_color = form['tee_color']
    db.session.commit()
    update_scores(round_id, form)


def delete_round(round_id):
    round_ = Round.query.get(round_id)
    db.session.delete(round_)
    db.session.commit()


@app.route('/user/<username>/round_edit/<round_id>', methods=['GET', 'POST'])
@flask_login.login_required
def round_edit(username, round_id):
    round_ = Round.query.get(round_id)
    if not round_:
        flash('round %s not found' % round_id)
        return redirect(url_for('round_list', username=username))

    course = Course.query.get(round_.course_id)
    scores = Score.query.filter_by(round_id=round_.id)
    courses = Course.query.all()

    if flask.request.method == 'POST':
        if 'delete' in flask.request.form:
            delete_round(round_id)
            flash('deleted round %s' % round_id)
        else:
            update_round(round_id, flask.request.form)
            flash('saved round %s' % round_id)
        return redirect(url_for('round_list', username=username))

    return render_template('round_edit.html', title='edit round',
                           course=course, courses=courses, round=round_,
                           scores=scores, username=username,
                           form=flask.request.form)


@app.route('/course_list')
@flask_login.login_required
def course_list():
    courses = Course.query.all()
    return render_template('course_list.html', title='courses',
                           courses=courses)


@app.route('/course_new', methods=['GET', 'POST'])
@flask_login.login_required
def course_new():
    if flask.request.method == 'POST':
        new_course = Course(name=flask.request.form['name'],
                            nickname=flask.request.form['nickname'])
        db.session.add(new_course)
        db.session.commit()
        return redirect(url_for('tee_new', course_id=new_course.id))

    return render_template('course_new.html', title='new course',
                           form=flask.request.form)


@app.route('/course_edit/<course_nickname>/tee_new', methods=['GET', 'POST'])
@flask_login.login_required
def tee_new(course_nickname):
    course = Course.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course not found')
        return redirect(url_for('course_list'))

    if flask.request.method == 'POST':
        if 'cancel' in flask.request.form:
            flash('canceled new tee')
            return redirect(url_for('course_edit',
                                    course_nickname=course.nickname))

        tee = Tee(course_id=course.id, date=parse(flask.request.form['date']),
                  color=flask.request.form['tee_color'],
                  rating=flask.request.form['rating'],
                  slope=flask.request.form['slope'])
        db.session.add(tee)
        db.session.commit()

        for i in range(1, 19):
            hole = Hole(tee_id=tee.id, hole=i,
                        par=flask.request.form['hole%i_par' % i],
                        yardage=flask.request.form['hole%i_yardage' % i])
            db.session.add(hole)
        db.session.commit()

        flash('saved %s tees' % tee.color)
        return redirect(url_for('course_list'))

    return render_template('tee_new.html', title='new tee',
                           form=flask.request.form)


@app.route('/course_edit/<course_nickname>/tee_edit/<tee_color>',
           methods=['GET', 'POST'])
@flask_login.login_required
def tee_edit(course_nickname, tee_color):
    course = Course.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course not found')

    tee = Tee.query.filter_by(course_id=course.id, color=tee_color)[-1]

    if flask.request.method == 'POST':
        if 'cancel' in flask.request.form:
            flash('canceled new tee')
            return redirect(url_for('course_edit',
                                    course_nickname=course.nickname))
        if 'delete' in flask.request.form:
            db.session.delete(tee)
            db.session.commit()
            flash('%s tee deleted' % tee.color)
            return redirect(url_for('course_edit',
                                    course_nickname=course.nickname))

        return redirect(url_for('course_edit',
                                course_nickname=course.nickname))

    return render_template('tee_edit.html', title='new tee', tee=tee,
                           form=flask.request.form)


@app.route('/course_edit/<course_nickname>', methods=['GET', 'POST'])
@flask_login.login_required
def course_edit(course_nickname):
    course = Course.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course %s not found' % course_nickname)
        return redirect(url_for('course_list'))

    if flask.request.method == 'POST':
        if 'cancel' in flask.request.form:
            flash('canceled %s edit' % course.nickname)
            return redirect(url_for('course_list'))
        if 'delete' in flask.request.form:
            db.session.delete(course)
            db.session.commit()
            flash('course %s deleted' % course.nickname)
            return redirect(url_for('course_list'))
        course.nickname = flask.request.form['nickname']
        course.name = flask.request.form['name']
        db.session.update(course)
        db.session.commit()
        flash('saved %s' % course.nickname)
        return redirect(url_for('course_list'))

    return render_template('course_edit.html', title='edit course',
                           course=course, form=flask.request.form)
