#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pathlib
import pickle

from app.models import *


def dump(data, name):
    fn = pathlib.Path(__file__).resolve().parent / 'app' / 'static' / name
    with open(fn, 'wb') as f:
        pickle.dump(data, f)


def dictify_courses():
    data = {}
    courses = GolfCourse.query.all()
    for course in courses:
        nickname = course.nickname
        data[nickname] = {
            'name': course.name,
            'tees': {}
            }
        for tee in course.tees:
            data[nickname]['tees'][tee.color] = {
                'date': tee.date,
                'rating': tee.rating,
                'slope': tee.slope,
                'holes': {}
                }
            for i in range(1, 19):
                hole = tee.get_hole(i)
                data[nickname]['tees'][tee.color]['holes'][hole.hole] = {
                    'par': hole.par,
                    'yardage': hole.yardage,
                    'handicap': hole.handicap
                    }
    return data


def dictify_users():
    data = {}
    users = User.query.all()
    for user in users:
        data[user.username] = {
            'password': user.password,
            'default_tees': user.default_tees,
            'rounds': {}
            }
        for r in user.rounds:
            data[user.username]['rounds'][r.id] = {
                'data': r.date,
                'notes': r.notes,
                'course': r.tee.course.nickname,
                'tee_color': r.tee.color,
                'scores': {}
                }
            for i in range(1, 19):
                hole = r.get_hole(i)
                data[user.username]['rounds'][r.id]['scores'][hole.hole] = {
                    'strokes': hole.score,
                    'putts': hole.putts,
                    'gir': hole.gir
                    }
    return data


if __name__ == '__main__':
    courses = dictify_courses()
    dump(courses, 'courses.pk')

    users = dictify_users()
    dump(users, 'users.pk')
