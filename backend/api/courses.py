from flask import g, jsonify, request

from backend import app
from backend.models import Course, CourseTee, CourseHole
from backend.actions import save_course_data, save_tee_data
from .authorize import check_authorization


@app.route('/api/courses')
def get_courses():
    return jsonify({c.id: c.nickname for c in Course.query.all()})


@app.route('/api/course/<course_id>')
def get_course(course_id):
    course = Course.query.get(course_id)
    if course:
        return jsonify(course.as_dict())
    return jsonify(error='not found')


@app.route('/api/update_course', methods=['POST'])
@app.route('/api/create_course', methods=['POST'])
@check_authorization
def post_course():
    if g.user.username != 'daryl':
        return jsonify(error='must be daryl')
    return jsonify(save_course_data(request.get_json()))


@app.route('/api/tees')
def get_tees():
    tees = {}
    for tee in CourseTee.query.all():
        tees[tee.id] = {'course': tee.course.nickname, 'color': tee.color}
    return jsonify(tees)


@app.route('/api/tee/<tee_id>')
def get_tee(tee_id):
    tee = CourseTee.query.get(tee_id)
    if tee:
        return jsonify(tee.as_dict())
    return jsonify(error='not found')


@app.route('/api/add_tee', methods=['POST'])
@app.route('/api/update_tee', methods=['POST'])
@check_authorization
def post_tee():
    if g.user.username != 'daryl':
        return jsonify(error='must be daryl')
    return jsonify(save_tee_data(request.get_json()))


@app.route('/api/tee/holes')
def get_tee_holes():
    holes = {}
    for hole in CourseHole.query.all():
        holes[hole.id] = {
            'hole_number': hole.hole_number,
            'course': hole.tee.course.nickname
        }
    return jsonify(holes)


@app.route('/api/tee/hole/<hole_id>')
def get_tee_hole(hole_id):
    hole = CourseHole.query.get(hole_id)
    if hole:
        return jsonify(hole.as_dict())
    return jsonify(error='not found')
