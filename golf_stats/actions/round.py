from datetime import datetime
from sqlalchemy.exc import IntegrityError

from golf_stats import db
from golf_stats.models import CourseTee, Round, User
from golf_stats.dates import str_to_date


def update_round(data):
    try:
        round_id = data.get('round_id')
        if round_id:
            round_ = Round.query.get(int(round_id))
            if not round_:
                return {'error': 'round not found'}
            user = round_.user
            if user.id != int(data['user_id']):
                return {'error': 'user does not match round.user'}
        else:
            user_id = data.get('user_id')
            if user_id:
                user = User.query.get(int(data['user_id']))
                if user:
                    round_ = Round()
                else:
                    return {'error': 'user not found'}
            else:
                return {'error': 'need either round_id or user_id'}

        if data.get('date'):
            round_.date = str_to_date(data['date'])
        else:
            round_.date = datetime.now()

        notes = data.get('notes')
        if notes and notes not in [None, '']:
            round_.notes = notes

        round_.tee = CourseTee.query.get(int(data['tee_id']))

        for hole_num, hole_data in data['holes'].items():
            hole = round_.get_hole(int(hole_num))
            hole.set_course_hole_data()

            hole.strokes = int(hole_data['strokes'])
            hole.putts = int(hole_data['putts'])
            hole.set_gir(hole_data.get('gir') in [True, 'True', 'true', 1])

    except ValueError as error:
        return {'error': 'ValueError: %s' % error}
    except TypeError as error:
        return {'error': 'TypeError: %s' % error}
    except KeyError as error:
        return {'error': 'KeyError: %s' % error}

    if not round_.user:
        user.rounds.append(round_)

    round_.calc_totals()
    round_.calc_handicap()
    user.recalc_handicaps(round_)

    try:
        db.session.commit()
        return {'success': True}
    except IntegrityError:
        db.session.rollback()
        return {'error': 'integrityerror'}
