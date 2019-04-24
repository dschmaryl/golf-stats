#!/usr/bin/env python3

import os
import pickle

from backend import app, db
from backend.models import Course, User
from backend.actions import save_tee_data, update_round


def load(filename):
    pickle_file = app.static_folder + '/' + filename
    if os.path.isfile(pickle_file):
        with open(pickle_file, 'rb') as file_:
            data = pickle.load(file_)
        return data
    return None


def add_courses(courses):
    for course_data in courses.values():
        course = Course(
            name=course_data['name'],
            nickname=course_data['nickname']
        )
        db.session.add(course)
        db.session.commit()

        for tee_data in course_data['tees'].values():
            tee_data.update({
                'id': None,
                'course_id': course.id,
                'date': tee_data['date'],
                'name': tee_data['color'],
                'holes': {hole_data['hole_number']: hole_data
                          for hole_data in tee_data['holes'].values()}
            })
            save_tee_data(tee_data)


def add_users(users):
    for user_data in users.values():
        user = User(
            username=user_data['username'],
            default_tees=user_data['default_tees']
        )
        user.set_password('asdf')
        db.session.add(user)
        db.session.commit()

        for _, round_data in user_data['rounds'].items():
            course = Course.query.filter_by(
                nickname=round_data['course']
            ).first()
            course_tee = course.get_tee_by_color(round_data['tee_color'])

            round_data['user_id'] = user.id
            round_data['tee_id'] = course_tee.id

            round_data.update({
                'user_id': user.id,
                'tee_id': course_tee.id,
                'holes': {h['hole_number']: h
                          for h in round_data['holes'].values()}
            })
            update_round(round_data)


def import_all():
    data = load('export.pk')
    if data:
        add_courses(data['courses'])
        add_users(data['users'])
    else:
        print('error loading data file')


if __name__ == '__main__':
    import_all()
