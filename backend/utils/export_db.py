#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pickle

from backend import app
from backend.models import Course, User


def dump(data, filename):
    dump_file = app.static_folder + '/' + filename
    with open(dump_file, 'wb') as f:
        pickle.dump(data, f)


def dictify_courses():
    data = {}
    courses = Course.query.all()
    for course in courses:
        data[course.id] = course.as_dict()

        for tee in course.tees:
            data[course.id]['tees'][tee.id] = tee.as_dict()

            for hole in tee.holes:
                data[course.id]['tees'][tee.id]['holes'][hole.id] = (
                    hole.as_dict()
                )
    return data


def dictify_users():
    data = {}
    users = User.query.all()
    for user in users:
        data[user.id] = user.as_dict()

        for r in user.rounds:
            data[user.id]['rounds'][r.id] = r.as_dict()

            for hole in r.holes:
                data[user.id]['rounds'][r.id]['holes'][hole.id] = (
                    hole.as_dict()
                )
    return data


def export_all():
    export_data = {
        'courses': dictify_courses(),
        'users': dictify_users()
    }
    dump(export_data, 'export.pk')


if __name__ == '__main__':
    export_all()
