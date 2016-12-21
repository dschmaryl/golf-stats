import flask
import flask_login

from datetime import date
from dateutil.parser import parse

from flask import flash, g, redirect, render_template, request, url_for

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
    g.user = flask_login.current_user


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if g.user is not None and g.user.is_authenticated:
        return redirect(url_for('index'))

    if request.method == 'POST':
        users = User.query.filter_by(username=request.form['username'])
        user = users.first()
        if user:
            password = request.form['password']
            if bcrypt.check_password_hash(user.password, password):
                flask_login.login_user(user, remember=True)
            else:
                flash('incorrect password')
        else:
            flash('username not found')
        return redirect(url_for('index'))

    return render_template('login.html', title='log in',
                           form=request.form)


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
    return render_template('round_list.html', title='rounds',
                           rounds=user.rounds)


@app.route('/user/<username>/round_new', methods=['GET', 'POST'])
@flask_login.login_required
def round_new(username):
    user = User.query.filter_by(username=username).first()
    courses = Course.query.all()

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled new round')
            return redirect(url_for('round_list', username=username))

        courses = Course.query.filter_by(nickname=request.form['course'])
        course = courses.first()
        user = User.query.filter_by(username=username).first()
        new_round = Round(date=parse(request.form['date']),
                          course_id=course.id, notes=request.form['notes'],
                          tee_color=request.form['tee_color'])
        user.rounds.append(new_round)

        for i in range(1, 19):
            gir_str = 'hole%i_gir' % i
            if gir_str in request.form:
                gir = request.form[gir_str]
            else:
                # need par for the hole to calculate gir from putts
                gir = 2  # temporary

            new_round.scores.append(Score(
                hole=i, gir=gir, score=request.form['hole%i_score' % i],
                putts=request.form['hole%i_putts' % i]
                ))
        db.session.commit()

        flash('added round %i' % new_round.id)
        return redirect(url_for('round_list', username=username))

    return render_template('round_new.html', title='new round',
                           user=user, courses=courses, date=date.today(),
                           form=request.form)


@app.route('/user/<username>/round_edit/<round_id>', methods=['GET', 'POST'])
@flask_login.login_required
def round_edit(username, round_id):
    round_ = Round.query.get(round_id)
    if not round_:
        flash('round %s not found' % round_id)
        return redirect(url_for('round_list', username=username))

    courses = Course.query.all()

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled round %s edit' % round_id)
        elif 'delete' in request.form:
            db.session.delete(round_)
            db.session.commit()
            flash('deleted round %s' % round_id)
        else:
            round_.date = parse(request.form['date'])
            if 'course' in request.form:
                round_.course = Course.query.get(request.form['course'])
            if 'tee_color' in request.form:
                round_.tee_color = request.form['tee_color']

            for i in range(1, 19):
                score = round_.scores.filter_by(hole=i).first()
                if score:
                    score.score = request.form['hole%i_score' % i]
                    score.putts = request.form['hole%i_putts' % i]
                    score.handicap = request.form['hole%i_handicap' % i]
                else:
                    hole_score_str = 'hole%i_score' % i
                    if hole_score_str in request.form:
                        score = Score(hole=i,
                                      score=request.form[hole_score_str])
                    hole_putts_str = 'hole%i_putts' % i
                    if hole_putts_str in request.form:
                        score.putts = request.form[hole_putts_str]
                    round_.scores.append(score)

                gir_str = 'hole%i_gir' % score.hole
                if gir_str in request.form:
                    score.gir = request.form[gir_str]
                else:
                    # need par for the hole to calculate gir from putts
                    score.gir = 2  # temporary
            db.session.commit()
            flash('saved round %s' % round_id)

        return redirect(url_for('round_list', username=username))

    return render_template('round_edit.html', title='edit round',
                             round=round_, courses=courses, form=request.form)


@app.route('/course_list')
@flask_login.login_required
def course_list():
    courses = Course.query.all()
    return render_template('course_list.html', title='courses',
                           courses=courses)


@app.route('/course_new', methods=['GET', 'POST'])
@flask_login.login_required
def course_new():
    if request.method == 'POST':
        new_course = Course(name=request.form['name'],
                            nickname=request.form['nickname'])
        db.session.add(new_course)
        db.session.commit()
        return redirect(url_for('tee_new', course_id=new_course.id))

    return render_template('course_new.html', title='new course',
                           form=request.form)


@app.route('/course_edit/<course_nickname>/tee_new', methods=['GET', 'POST'])
@flask_login.login_required
def tee_new(course_nickname):
    course = Course.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course not found')
        return redirect(url_for('course_list'))

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled new tee')
            return redirect(url_for('course_edit', title='edit course',
                                    course_nickname=course.nickname))

        tee = Tee(date=parse(request.form['date']),
                  color=request.form['tee_color'],
                  rating=request.form['rating'],
                  slope=request.form['slope'])
        course.tees.append(tee)

        for i in range(1, 19):
            tee.holes.append(Hole(
                hole=i,
                par=request.form['hole%i_par' % i],
                yardage=request.form['hole%i_yardage' % i],
                handicap=request.form['hole%i_handicap' % i]
                ))
        db.session.commit()

        flash('saved %s tees' % tee.color)
        return redirect(url_for('course_edit', title='edit course',
                                course_nickname=course.nickname))

    return render_template('tee_new.html', title='new tee',
                           form=request.form)


@app.route('/course_edit/<course_nickname>/tee_edit/<tee_id>',
           methods=['GET', 'POST'])
@flask_login.login_required
def tee_edit(course_nickname, tee_id):
    course = Course.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course not found')

    tee = course.tees.filter_by(id=tee_id).first()

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled %s tees edit' % tee.color)
        elif 'delete' in request.form:
            db.session.delete(tee)
            db.session.commit()
            flash('%s tee deleted' % tee.color)
        else:
            tee.date = parse(request.form['date'])
            tee.rating = request.form['rating']
            tee.slope = request.form['slope']
            tee.color = request.form['tee_color']

            for i in range(1, 19):
                par = request.form['hole%i_par' % i]
                yardage = request.form['hole%i_yardage' % i]
                handicap = request.form['hole%i_handicap' % i]

                hole = tee.holes.filter_by(hole=i).first()
                if hole:
                    hole.par = par
                    hole.yardage = yardage
                    hole.handicap = handicap
                else:
                    tee.holes.append(Hole(hole=i, par=par, yardage=yardage,
                                          handicap=handicap))
            db.session.commit()
            flash('saved %s tees' % tee.color)

        return redirect(url_for('course_edit', title='edit course',
                                course_nickname=course.nickname))

    return render_template('tee_edit.html', title='new tee', tee=tee,
                           form=request.form)


@app.route('/course_edit/<course_nickname>', methods=['GET', 'POST'])
@flask_login.login_required
def course_edit(course_nickname):
    course = Course.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course %s not found' % course_nickname)
        return redirect(url_for('course_list'))

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled %s edit' % course.nickname)
        elif 'delete' in request.form:
            db.session.delete(course)
            db.session.commit()
            flash('course %s deleted' % course.nickname)
        else:
            course.nickname = request.form['nickname']
            course.name = request.form['name']
            db.session.commit()
            flash('saved %s' % course.nickname)

        return redirect(url_for('course_list'))

    return render_template('course_edit.html', title='edit course',
                           course=course, form=request.form)
