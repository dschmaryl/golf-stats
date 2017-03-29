from datetime import date
from dateutil.parser import parse
from flask import flash, g, redirect, render_template, request, url_for
from flask_login import login_required, current_user

from app import app, db, login_manager
from app.models import GolfRound, HoleScore, GolfCourse, User


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

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled password change')
            return redirect(url_for('index'))

        for v in ['old_password', 'new_password', 're_password']:
            if v not in request.form:
                flash('please fill in every box')
                return redirect(url_for('change_password', username=username))
        old_password = request.form['old_password']
        if user.check_password(old_password):
            if request.form['new_password'] == request.form['re_password']:
                user.set_password(request.form['new_password'])
                db.session.commit()
                flash('password changed')
                return redirect(url_for('index'))
            else:
                flash('new passwords do not match')
        else:
            flash('old password is incorrect')
        return redirect(url_for('change_password', username=username))

    return render_template('change_password.html', username=username,
                           title='change password')


@app.route('/user/<username>/round_list')
@login_required
def round_list(username):
    user = User.query.filter_by(username=username).first()
    return render_template('round_list.html', title='rounds',
                           rounds=reversed(user.get_rounds()))


@app.route('/user/<username>/round_new', methods=['GET', 'POST'])
@login_required
def round_new(username):
    user = User.query.filter_by(username=username).first()
    courses = GolfCourse.query.all()

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled new round')
            return redirect(url_for('user', username=username))

        new_round = GolfRound(date=parse(request.form['date']),
                              notes=request.form['notes'])

        course = GolfCourse.query.get(request.form['course'])
        tee = course.get_tee_by_color(request.form['tee_color'])
        new_round.tee = tee

        user.rounds.append(new_round)

        if 'hole_by_hole' in request.form:
            db.session.commit()
            return redirect(url_for('new_hole', username=username,
                                    round_id=new_round.id, hole_number=1))

        for i in range(1, 19):
            if not request.form['hole%i_score' % i]:
                continue

            score = HoleScore(
                hole=i, score=int(request.form['hole%i_score' % i]),
                putts=int(request.form['hole%i_putts' % i])
                )
            new_round.scores.append(score)
            score.set_gir(request.form.get('hole%i_gir' % i))

        new_round.calc_totals()
        new_round.calc_handicap()

        db.session.commit()
        flash('added round %i' % new_round.id)
        return redirect(url_for('round_list', username=username))

    return render_template('round_new.html', title='new round',
                           user=user, courses=courses, date=date.today(),
                           form=request.form)


@app.route('/user/<username>/round_new/<round_id>/hole/<hole_number>',
           methods=['GET', 'POST'])
@login_required
def new_hole(username, round_id, hole_number):
    golf_round = GolfRound.query.get(round_id)
    score = HoleScore(hole=int(hole_number))
    golf_round.scores.append(score)

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled new round')
            return redirect(url_for('user', username=username))

        score.score = int(request.form['score'])
        score.putts = int(request.form['putts'])
        score.set_gir(request.form.get('gir'))
        db.session.commit()

        if int(hole_number) == 18:
            return redirect(url_for('new_last', round_id=golf_round.id,
                                    username=golf_round.user.username))
        return redirect(url_for('new_hole', username=golf_round.user.username,
                                round_id=golf_round.id,
                                hole_number=(int(hole_number) + 1)))

    return render_template('hole_new.html', title='new hole',
                           hole_number=hole_number, form=request.form)


@app.route('/user/<username>/round_new/<round_id>/results',
           methods=['GET', 'POST'])
@login_required
def new_last(username, round_id):
    golf_round = GolfRound.query.get(round_id)
    golf_round.calc_totals()
    golf_round.calc_handicap()
    db.session.commit()

    if request.method == 'POST':
        if 'delete' in request.form:
            db.session.delete(golf_round)
            db.session.commit()
            flash('deleted round %s' % round_id)
        return redirect(url_for('user', username=golf_round.user.username))

    return render_template('hole_last.html', title='results', round=golf_round,
                           form=request.form)


@app.route('/user/<username>/round_edit/<round_id>', methods=['GET', 'POST'])
@login_required
def round_edit(username, round_id):
    golf_round = GolfRound.query.get(round_id)
    if not golf_round:
        flash('round %s not found' % round_id)
        return redirect(url_for('round_list', username=username))

    courses = GolfCourse.query.all()

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled round %s edit' % round_id)
        elif 'delete' in request.form:
            db.session.delete(golf_round)
            db.session.commit()
            flash('deleted round %s' % round_id)
        else:
            golf_round.date = parse(request.form['date'])
            course = GolfCourse.query.get(request.form['course'])
            tee = course.get_tee_by_color(request.form['tee_color'])
            golf_round.tee = tee

            for i in range(1, 19):
                score = golf_round.get_score_for_hole(i)
                if score:
                    score.score = int(request.form['hole%i_score' % i])
                    score.putts = int(request.form['hole%i_putts' % i])
                else:
                    score_str = request.form.get('hole%i_score' % i)
                    if score_str:
                        score = HoleScore(hole=i, score=int(score_str))
                    putts_str = request.form.get('hole%i_putts' % i)
                    if putts_str:
                        score.putts = int(putts_str)
                    golf_round.scores.append(score)
                score.set_gir(request.form.get('hole%i_gir' % i))

            golf_round.calc_totals()
            golf_round.calc_handicap()
            golf_round.user.recalc_handicaps(golf_round)
            db.session.commit()
            flash('saved round %s' % round_id)

        return redirect(url_for('round_list', username=username))

    return render_template('round_edit.html', title='edit round',
                           round=golf_round, courses=courses,
                           form=request.form)
