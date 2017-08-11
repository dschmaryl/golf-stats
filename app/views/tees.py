# from flask import jsonify, request
#
# from app import app
# from app.models import Round, Course, User


TEES = ['white', 'red']


# @app.route('/tees')
# def tees():
#     courses = Course.query.all()
#     data = {}
#     for course in courses:
#         data[course.nickname] = {}
#         for tee in course.tees:
#             data[course.nickname][tee.color] = [tee.get_hole(i).par
#                                                 for i in range(1, 19)]
#     return jsonify(data)
