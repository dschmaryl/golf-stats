from flask import g, jsonify
from flask_login import current_user

from golf_stats import app, db
from golf_stats.models import Course


@app.route('/api/courses')
def get_courses():
    if current_user.is_authenticated:
        courses = Course.query.all()
        return jsonify({c.id: c.nickname for c in courses})
    return jsonify(error='not authorized')


@app.route('/api/course/<course_id>')
def get_course(course_id):
    if current_user.is_authenticated:
        course = Course.query.get(course_id)
        if course:
            return jsonify(course.as_dict())
        else:
            return jsonify(error='not found')
    else:
        return jsonify(error='not authorized')
