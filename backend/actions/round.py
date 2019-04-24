from datetime import datetime
from sqlalchemy.exc import IntegrityError

from backend import db
from backend.models import CourseTee, Round, User
from backend.dates import str_to_date


def update_round(round_data):
    try:
        round_id = round_data.get('round_id')
        if round_id:
            _round = Round.query.get(int(round_id))
            if not _round:
                error = {'error': 'round not found'}
            else:
                user = _round.user
                if user.username == 'guest':
                    error = {'error': 'cannot edit guest account'}
                if user.id != int(round_data['user_id']):
                    error = {'error': 'user does not match round.user'}
        else:
            user_id = round_data.get('user_id')
            if not user_id:
                error = {'error': 'need either round_id or user_id'}
            else:
                user = User.query.get(int(round_data['user_id']))
                if not user:
                    error = {'error': 'user not found'}
                else:
                    if user.username == 'guest':
                        error = {'error': 'cannot edit guest account'}
                    else:
                        _round = Round()

        if error:
            return error

        if round_data.get('date'):
            _round.date = str_to_date(round_data['date'])
        else:
            _round.date = datetime.now()

        notes = round_data.get('notes')
        if notes and notes not in [None, '']:
            _round.notes = notes

        _round.tee = CourseTee.query.get(int(round_data['tee_id']))

        for hole_num, hole_data in round_data['holes'].items():
            hole = _round.get_hole(int(hole_num))
            hole.set_course_hole_data()

            hole.strokes = int(hole_data['strokes'])
            hole.putts = int(hole_data['putts'])
            hole.set_gir(hole_data.get('gir') in [True, 'True', 'true', 1])

    except (ValueError, TypeError, KeyError) as error:
        return {'error': '%s: %s' % (type(error).__name__, error)}

    if not _round.user:
        user.rounds.append(_round)

    _round.calc_totals()
    _round.calc_handicap()
    user.recalc_handicaps(_round)

    try:
        db.session.commit()
        return {'success': True}
    except IntegrityError:
        db.session.rollback()
        return {'error': 'IntegrityError'}
