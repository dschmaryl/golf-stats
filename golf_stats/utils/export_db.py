#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pathlib
import pickle

from golf_stats.models import *


def dump(data, name):
    path = pathlib.Path(__file__).resolve().parent.parent.parent / 'data'
    filename = str(path / name)
    with open(filename, 'wb') as f:
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
                'date': r.date,
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


def export_all():
    export_data = {
        'courses': dictify_courses(),
        'users': dictify_users()
    }
    dump(export_data, 'export_data.pk')


if __name__ == '__main__':
    export_all()
