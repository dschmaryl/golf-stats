from flask import flash, redirect, render_template, request, url_for
from flask_login import login_required

from app import app, db
from app.models import GolfRound, GolfCourse, User
from app.forms import GolfRoundForm
from .flash_errors import flash_errors


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
    form = GolfRoundForm(request.form)
    form.course_data = 'stony'
    form.tee_color_data = user.default_tees

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled new round')
            return redirect(url_for('user', username=username))

        if form.validate():
            new_round = GolfRound(date=form.date.data, notes=form.notes.data)
            course = GolfCourse.query.get(form.course.data)
            new_round.tee = course.get_tee_by_color(form.tee_color_data)
            user.rounds.append(new_round)

            if 'hole_by_hole' in request.form:
                db.session.commit()
                return redirect(url_for('hole_new', username=username,
                                        round_id=new_round.id, hole_number=1))

            for i in range(1, 19):
                if not request.form['hole%i_score' % i]:
                    continue
                score = new_round.get_hole(i)
                score.score = int(request.form['hole%i_score' % i])
                score.putts = int(request.form['hole%i_putts' % i])
                score.set_gir(request.form.get('hole%i_gir' % i))

            new_round.calc_totals()
            new_round.calc_handicap()
            db.session.commit()

            flash('added round %i' % new_round.id)
            return redirect(url_for('round_list', username=username))
        else:
            flash_errors(form)

    return render_template('round.html', title='new round', form=form,
                           round=None)


@app.route('/user/<username>/round_edit/<round_id>', methods=['GET', 'POST'])
@login_required
def round_edit(username, round_id):
    golf_round = GolfRound.query.get(round_id)
    if not golf_round:
        flash('round %s not found' % round_id)
        return redirect(url_for('round_list', username=username))

    form = GolfRoundForm(request.form, obj=golf_round)
    form.course_data = golf_round.tee.course.nickname
    form.tee_color_data = golf_round.tee.color

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled round %s edit' % round_id)
            return redirect(url_for('user', username=username))

        if form.delete.data:
            db.session.delete(golf_round)
            db.session.commit()
            flash('deleted round %s' % round_id)
            return redirect(url_for('user', username=username))

        if form.validate():
            golf_round.date = form.date.data
            course = GolfCourse.query.get(form.course.data)
            golf_round.tee = course.get_tee_by_color(form.tee_color_data)

            if 'hole_by_hole' in request.form:
                db.session.commit()
                return redirect(url_for('hole_edit', username=username,
                                        round_id=golf_round.id, hole_number=1))

            for i in range(1, 19):
                score = golf_round.get_hole(i)
                if request.form['hole%i_score' % i]:
                    score.score = int(request.form['hole%i_score' % i])
                    score.putts = int(request.form['hole%i_putts' % i])
                    score.set_gir(request.form.get('hole%i_gir' % i))

            golf_round.calc_totals()
            golf_round.calc_handicap()
            golf_round.user.recalc_handicaps(golf_round)
            db.session.commit()

            flash('saved round %s' % round_id)
            return redirect(url_for('round_list', username=username))
        else:
            flash_errors(form)

    return render_template('round.html', title='edit round', form=form,
                           round=golf_round)
