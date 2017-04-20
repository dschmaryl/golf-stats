from flask import flash, redirect, render_template, request, url_for
from flask_login import login_required

from app import app, db
from app.models import GolfRound
from app.forms import HoleScoreForm
from .flash_errors import flash_errors


@app.route('/user/<username>/round_new/<round_id>/hole/<hole_number>',
           methods=['GET', 'POST'])
@login_required
def hole_new(username, round_id, hole_number):
    golf_round = GolfRound.query.get(round_id)
    score = golf_round.get_score_for_hole(int(hole_number))
    form = HoleScoreForm(request.form)

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled hole')
            return redirect(url_for('user', username=username))

        if form.validate():
            score.score = form.score.data
            score.putts = form.putts.data
            score.set_gir(form.gir.data)
            db.session.commit()

            if int(hole_number) == 18:
                return redirect(url_for('hole_last', round_id=golf_round.id,
                                        username=golf_round.user.username))

            return redirect(url_for('hole_new',
                                    username=golf_round.user.username,
                                    round_id=golf_round.id,
                                    hole_number=(int(hole_number) + 1)))
        else:
            flash_errors(form)

    return render_template('hole.html', title='new hole', form=form,
                           hole_number=hole_number)


@app.route('/user/<username>/round_edit/<round_id>/hole/<hole_number>',
           methods=['GET', 'POST'])
@login_required
def hole_edit(username, round_id, hole_number):
    golf_round = GolfRound.query.get(round_id)
    score = golf_round.get_score_for_hole(int(hole_number))
    form = HoleScoreForm(request.form, obj=score)

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled hole')
            return redirect(url_for('user', username=username))

        if form.validate():
            score.score = form.score.data
            score.putts = form.putts.data
            score.set_gir(form.gir.data)
            db.session.commit()

            if int(hole_number) == 18:
                return redirect(url_for('hole_last', round_id=golf_round.id,
                                        username=golf_round.user.username))

            return redirect(url_for('hole_edit',
                                    username=golf_round.user.username,
                                    round_id=golf_round.id,
                                    hole_number=(int(hole_number) + 1)))
        else:
            flash_errors(form)

    return render_template('hole.html', title='edit hole', form=form,
                           hole_number=hole_number)


@app.route('/user/<username>/round_new/<round_id>/results',
           methods=['GET', 'POST'])
@login_required
def hole_last(username, round_id):
    golf_round = GolfRound.query.get(round_id)
    if not golf_round:
        flash('round %s not found' % round_id)
        return redirect(url_for('user', username=username))

    golf_round.calc_totals()
    golf_round.calc_handicap()
    db.session.commit()

    if request.method == 'POST':
        if 'delete' in request.form:
            db.session.delete(golf_round)
            db.session.commit()
            flash('deleted round %s' % round_id)
        flash('saved round %s' % round_id)
        return redirect(url_for('round_list',
                                username=golf_round.user.username))

    return render_template('hole_last.html', title='results', round=golf_round,
                           form=request.form)
