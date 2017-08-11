import json

from flask import jsonify

from app import app
from app.models import Course


TEES = ['white', 'red']


def get_tees(course=None, tee_color=None):
    courses = Course.query.all()
    data = {}
    for course in courses:
        data[course.nickname] = {}
        for tee in course.tees:
            data[course.nickname][tee.color] = [tee.get_hole(i).par
                                                for i in range(1, 19)]
    return data


def get_json_tees(course=None, tee_color=None):
    return json.dumps(get_tees(course, tee_color))


@app.route('/tees')
def tees():
    return jsonify(get_tees())
