from datetime import datetime
from sqlalchemy.exc import IntegrityError

from golf_stats import db
from golf_stats.models import Course, CourseTee
from golf_stats.dates import str_to_date


def save_course_data(course_data):
    try:
        if course_data.get('course_id'):
            course = Course.query.get(int(course_data['course_id']))
            if not course:
                return {'error': 'course not found'}
        else:
            course = Course(name=course_data['name'],
                            nickname=course_data['nickname'])

        course.name = course_data['name']
        course.nickname = course_data['nickname']

    except (ValueError, KeyError) as error:
        return {'error': '%s: %s' % (type(error).__name__, error)}

    if not course_data.get('course_id'):
        db.session.add(course)

    try:
        db.session.commit()
        return {'success': True}
    except IntegrityError:
        db.session.rollback()
        return {'error': 'IntegrityError'}


def save_tee_data(tee_data):
    try:
        if tee_data.get('tee_id'):
            tee = CourseTee.query.get(int(tee_data['tee_id']))
            if not tee:
                return {'error': 'tee not found'}
        else:
            course = Course.query.get(tee_data['course_id'])
            if not course:
                return {'error': 'course not found'}
            else:
                tee = course.get_new_tee(color=tee_data['color'])

        tee.name = tee_data['name']
        tee.color = tee_data['color']
        tee.date = str_to_date(tee_data['date'])
        tee.rating = tee_data['rating']
        tee.slope = tee_data['slope']

        for hole_num, hole_data in tee_data['holes'].items():
            hole = tee.get_hole(int(hole_num))
            hole.par = hole_data['par']
            hole.yardage = hole_data['yardage']
            hole.handicap = hole_data['handicap']

    except (ValueError, TypeError, KeyError) as error:
        return {'error': '%s: %s' % (type(error).__name__, error)}

    tee.bogey_rating = tee_data.get('bogey_rating')
    tee.front_9_rating = tee_data.get('front_9_rating')
    tee.front_9_slope = tee_data.get('front_9_slope')
    tee.back_9_rating = tee_data.get('back_9_rating')
    tee.back_9_slope = tee_data.get('back_9_slope')

    try:
        db.session.commit()
        return {'success': True}
    except IntegrityError:
        db.session.rollback()
        return {'error': 'IntegrityError'}
