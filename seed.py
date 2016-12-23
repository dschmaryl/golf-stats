#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import csv
import pickle

from datetime import date
from dateutil.parser import parse

from app import db, bcrypt
from app.models import *
from app.stats import *


def get_golfer(golfer):
    file_name = 'data/' + golfer + '.csv'
    with open(file_name, 'r') as f:
        data = [row for row in csv.reader(f, delimiter=',')]
    return data


def seed_golfers():
    for username in ['daryl', 'kim', 'ryan']:
        user = User(username=username,
                    password=bcrypt.generate_password_hash('asdf'))
        user.default_tees = 'red' if username == 'kim' else 'white'
        db.session.add(user)

        data = get_golfer(username)
        if len(data) > 0:
            for row in data:
                course = Course.query.filter_by(nickname=row[1]).first()
                tee = course.tees.filter_by(color=user.default_tees)[-1]
                round_ = Round(date=parse(row[0]), tee=tee)
                for i in range(1, 19):
                    score = int(row[i + 3])
                    putts = int(row[i + 21])
                    gir = calc_gir(score, putts, tee.get_hole(i).par)
                    round_.scores.append(Score(hole=i, score=score,
                                               putts=putts, gir=gir))
                round_.calc_totals()
                user.rounds.append(round_)
                round_.handicap_index = calc_handicap(round_)
    db.session.commit()


def get_courses():
    with open('data/courses.pk', 'rb') as f:
        courses_dict = pickle.load(f)
    return courses_dict


def seed_courses():
    names = {'stony': 'Stony Ford', 'hickory': 'Hickory Hill'}
    courses = get_courses()
    for course_name in courses.keys():
        course = Course(nickname=course_name, name=names[course_name])
        db.session.add(course)
        for color in ['white', 'red']:
            rating = courses[course_name][color]['rating']
            slope = courses[course_name][color]['slope']
            tee = Tee(date=date.today(), color=color, rating=rating,
                      slope=slope)
            for i in range(1, 19):
                tee.holes.append(Hole(
                    hole=i, par=courses[course_name]['par'][i-1],
                    yardage=courses[course_name][color]['yards'][i-1]
                    ))
            course.tees.append(tee)
    db.session.commit()


if __name__ == '__main__':
    seed_courses()
    seed_golfers()
