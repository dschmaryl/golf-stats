from flask import jsonify

from golf_stats import app
from golf_stats.models import Course

from .authorize import check_authorization


@app.route('/api/courses')
@check_authorization
def get_courses():
    courses = Course.query.all()
    return jsonify({c.id: c.nickname for c in courses})


@app.route('/api/course/<course_id>')
@check_authorization
def get_course(course_id):
    course = Course.query.get(course_id)
    if course:
        return jsonify(course.as_dict())
    else:
        return jsonify(error='not found')
