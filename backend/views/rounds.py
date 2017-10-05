from flask import flash, g, redirect, render_template, request, url_for
from flask_login import login_required

from backend import app, db
from backend.models import Round, Course, User
from backend.forms import RoundForm
from backend.actions import update_round
from backend.dates import date_to_str
from .flash_errors import flash_errors
from .tees import get_tees_json, TEES
from .users import check_user


@app.route('/user/<username>/round_list')
@login_required
def round_list(username):
    if not check_user(username):
        return redirect(url_for('round_list', username=g.user.username))

    user = User.query.filter_by(username=username).first()
    return render_template('round_list.html', title='rounds',
                           rounds=reversed(user.get_rounds()))


@app.route('/user/<username>/round_new', methods=['GET', 'POST'])
@app.route('/user/<username>/round_edit/<round_id>', methods=['GET', 'POST'])
@login_required
def round_view(username, round_id=None):
    if not check_user(username):
        return redirect(url_for('round_list', username=g.user.username))
    if round_id:
        golf_round = Round.query.get(round_id)
        if not golf_round:
            flash('round %s not found' % round_id)
            return redirect(url_for('round_list', username=username))
    else:
        golf_round = None

    user = User.query.filter_by(username=username).first()
    courses = Course.query.all()
    form = RoundForm(request.form, obj=golf_round)
    form.course.choices = [(course.id, course.nickname) for course in courses]
    form.tee_color.choices = [(i, TEES[i]) for i in range(len(TEES))]

    if golf_round:
        title = 'edit round'
        holes = [golf_round.get_hole(i) for i in range(1, 19)]
        form.tee_color.data = TEES.index(golf_round.tee.color)
        form.course.data = golf_round.tee.course.id
    else:
        title = 'new round'
        holes = None
        form.tee_color.data = TEES.index(user.default_tees)
        if user.get_rounds():
            form.course.data = user.get_latest_round().tee.course.id
        else:
            form.course.data = 1

    tees_json = get_tees_json()

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled %s' % title)
            return redirect(url_for('round_list', username=username))
        if form.delete.data:
            db.session.delete(golf_round)
            db.session.commit()
            flash('deleted round %s' % round_id)
            return redirect(url_for('round_list', username=username))

        if form.validate():
            course = Course.query.get(int(request.form.get('course')))
            tee_color = TEES[int(request.form.get('tee_color'))]
            tee_id = course.get_tee_by_color(tee_color).id
            data = {
                'round_id': round_id,
                'user_id': user.id,
                'date': date_to_str(form.date.data),
                'notes': form.notes.data,
                'tee_id': tee_id,
                'holes': {i: {} for i in range(1, 19)}
            }
            for hole_num in data['holes'].keys():
                data['holes'][hole_num] = {
                    'strokes': request.form['hole%i_strokes' % hole_num],
                    'putts': request.form['hole%i_putts' % hole_num],
                    'gir': request.form.get('hole%i_gir' % hole_num)
                }

            result = update_round(data)
            if result.get('success'):
                flash('saved round')
                return redirect(url_for('round_list', username=username))
            else:
                flash(result['error'])
        else:
            flash_errors(form)

    return render_template('round.html', title=title, form=form, holes=holes,
                           round=golf_round, tees_json=tees_json)
