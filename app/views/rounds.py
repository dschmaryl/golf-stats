from flask import flash, redirect, render_template, request, url_for
from flask_login import login_required

from app import app, db, TEES
from app.models import Round, Course, User
from app.forms import RoundForm
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
    form = RoundForm(request.form)
    form.course.data = Course.query.filter_by(nickname='stony').first().id
    form.tee_color.data = TEES.index(user.default_tees)

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled new round')
            return redirect(url_for('round_list', username=username))

        if form.validate():
            new_round = Round(date=form.date.data, notes=form.notes.data)
            course = Course.query.get(form.course.data)
            new_round.tee = course.get_tee_by_color(TEES[form.tee_color.data])
            user.rounds.append(new_round)

            if 'hole_by_hole' in request.form:
                db.session.commit()
                return redirect(url_for('hole_new', username=username,
                                        round_id=new_round.id, hole_number=1))

            for i in range(1, 19):
                if not request.form['hole%i_strokes' % i]:
                    continue
                hole = new_round.get_hole(i)
                hole.set_course_hole_data()
                hole.strokes = int(request.form['hole%i_strokes' % i])
                hole.putts = int(request.form['hole%i_putts' % i])
                hole.set_gir(request.form.get('hole%i_gir' % i))

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
    golf_round = Round.query.get(round_id)
    if not golf_round:
        flash('round %s not found' % round_id)
        return redirect(url_for('round_list', username=username))

    form = RoundForm(request.form, obj=golf_round)
    form.course.data = golf_round.tee.course.id

    # TODO: put tees into a global of some sort
    form.tee_color.data = TEES.index(golf_round.tee.color)

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled round %s edit' % round_id)
            return redirect(url_for('round_list', username=username))

        if form.delete.data:
            db.session.delete(golf_round)
            db.session.commit()
            flash('deleted round %s' % round_id)
            return redirect(url_for('round_list', username=username))

        if form.validate():
            golf_round.date = form.date.data
            golf_round.notes = form.notes.data
            course = Course.query.get(form.course.data)
            tee_color = TEES[form.tee_color.data]
            if tee_color != golf_round.tee.color:
                golf_round.tee = course.get_tee_by_color(tee_color)

            if 'hole_by_hole' in request.form:
                db.session.commit()
                return redirect(url_for('hole_edit', username=username,
                                        round_id=golf_round.id, hole_number=1))

            for i in range(1, 19):
                hole = golf_round.get_hole(i)
                if request.form['hole%i_strokes' % i]:
                    hole.strokes = int(request.form['hole%i_strokes' % i])
                    hole.putts = int(request.form['hole%i_putts' % i])
                    hole.set_gir(request.form.get('hole%i_gir' % i))

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
