from flask import jsonify

from golf_stats import app
from golf_stats.models import Course, CourseTee, CourseHole
from .authorize import check_authorization


@app.route('/api/courses')
@check_authorization
def get_courses():
    return jsonify({c.id: c.nickname for c in Course.query.all()})


@app.route('/api/course/<course_id>')
@check_authorization
def get_course(course_id):
    course = Course.query.get(course_id)
    if course:
        return jsonify(course.as_dict())
    else:
        return jsonify(error='not found')


@app.route('/api/tees')
@check_authorization
def get_tees():
    tees = {}
    for tee in CourseTee.query.all():
        tees[tee.id] = {'course': tee.course.nickname, 'color': tee.color}
    return jsonify(tees)


@app.route('/api/tee/<tee_id>')
@check_authorization
def get_tee(tee_id):
    tee = CourseTee.query.get(tee_id)
    if tee:
        return jsonify(tee.as_dict())
    else:
        return jsonify(error='not found')


@app.route('/api/tee/holes')
@check_authorization
def get_tee_holes():
    holes = {}
    for hole in CourseHole.query.all():
        holes[hole.id] = {
            'hole_number': hole.hole_number,
            'course': hole.tee.course.nickname
        }
    return jsonify(holes)


@app.route('/api/tee/hole/<hole_id>')
@check_authorization
def get_tee_hole(hole_id):
    hole = CourseHole.query.get(hole_id)
    if hole:
        return jsonify(hole.as_dict())
    else:
        return jsonify(error='not found')
