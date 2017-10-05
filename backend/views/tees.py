import json

from backend.models import Course


TEES = ['white', 'red']


def get_tees_json():
    courses = Course.query.all()
    data = {}
    for course in courses:
        data[course.nickname] = {}
        for tee in course.tees:
            data[course.nickname][tee.color] = [tee.get_hole(i).par
                                                for i in range(1, 19)]
    return json.dumps(data)
