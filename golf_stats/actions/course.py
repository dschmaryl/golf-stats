from sqlalchemy.exc import IntegrityError

from golf_stats import db
from golf_stats.models import Course


def save_course_data(course_data):
    try:
        course_id = course_data.get('course_id')
        if course_id:
            course = Course.query.get(int(course_id))
            if not course:
                return {'error': 'course not found'}
        else:
            course = Course(name=course_data['name'],
                                nickname=course_data['nickname'])
    except ValueError as error:
        return {'error': 'ValueError: %s' % error}
    except KeyError as error:
        return {'error': 'KeyError: %s' % error}

    if course_data.get('name'):
        course.name = course_data['name']

    if course_data.get('nickname'):
        course.nickname = course_data['nickname']

    if not course_data.get('course_id'):
        db.session.add(course)

    try:
        db.session.commit()
        return {'success': True}
    except IntegrityError:
        db.session.rollback()
        return {'error': 'IntegrityError'}
