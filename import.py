#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pathlib
import pickle

from app import db
from app.models import *


def get(name):
    fn = pathlib.Path(__file__).resolve().parent / 'data' / name
    with open(fn, 'rb') as f:
        data = pickle.load(f)
    return data


def add_courses(courses):
    for course_name, course_data in courses.items():
        course = Course(
            nickname=course_name,
            name=course_data['name']
            )
        db.session.add(course)

        for tee_color, tee_data in course_data['tees'].items():
            tee = course.get_new_tee()
            tee.date = tee_data['date']
            tee.color = tee_color
            tee.gender = 'f' if tee_color == 'red' else 'm'
            tee.rating = tee_data['rating']
            tee.slope = tee_data['slope']

            for i in range(1, 19):
                course_hole = tee.get_hole(i)
                course_hole.par = tee_data['holes'][i]['par']
                course_hole.yardage = tee_data['holes'][i]['yardage']
                course_hole.handicap = tee_data['holes'][i]['handicap']

    db.session.commit()


def add_users(users):
    for username, user_data in users.items():
        user = User(
            username=username,
            password=user_data['password'],
            default_tees=user_data['default_tees']
            )
        db.session.add(user)

        for round_id, round_data in user_data['rounds'].items():
            course = Course.query.filter_by(
                nickname=round_data['course']
                ).first()
            course_tee = course.get_tee_by_color(round_data['tee_color'])
            golf_round = Round(date=round_data['date'], tee=course_tee,
                                   notes=round_data['notes'])
            user.rounds.append(golf_round)

            for i in range(1, 19):
                hole = golf_round.get_hole(i)
                hole.strokes = round_data['scores'][i]['strokes']
                hole.putts = round_data['scores'][i]['putts']
                hole.gir = round_data['scores'][i]['gir']
                hole.set_course_hole_data()

            golf_round.calc_totals()

        for golf_round in user.get_rounds():
            golf_round.calc_handicap()

    db.session.commit()


if __name__ == '__main__':
    export_data = get('export_data.pk')
    add_courses(export_data['courses'])
    add_users(export_data['users'])
