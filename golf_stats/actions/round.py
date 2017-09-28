from sqlalchemy.exc import IntegrityError

from golf_stats import db
from golf_stats.models import CourseTee, Round, User


def update_round(data):
    try:
        if not data['round_id']:
            user = User.query.get(data['user_id'])
            round_ = Round(date=data['date'], notes=data['notes'])
        else:
            round_ = Round.query.get(data['round_id'])
            if not round_:
                return {'error': 'round not found'}
            user = round_.user
            if user.id != data['user_id']:
                return {'error': 'user does not match round.user'}
        try:
            round_.tee = CourseTee.query.get(int(data['tee_id']))

            for hole_num, hole_data in data['holes'].items():
                hole = round_.get_hole(int(hole_num))
                hole.set_course_hole_data()

                hole.strokes = int(hole_data['strokes'])
                hole.putts = int(hole_data['putts'])
                hole.set_gir(hole_data['gir'] in [True, 'True', 'true', 1])

        except (ValueError, TypeError):
            return {'error': 'bad data'}
    except KeyError:
        return {'error': 'bad data'}

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
