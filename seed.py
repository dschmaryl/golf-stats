#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import csv
import os
import pickle

from datetime import date
from dateutil.parser import parse

from app import db, bcrypt
from app.models import *


DEFAULT_PASSWORD = os.environ['DEFAULT_PASSWORD']


def get_courses():
    with open('data/courses.pk', 'rb') as f:
        courses_dict = pickle.load(f)
    return courses_dict


def get_golfer(golfer):
    file_name = 'data/' + golfer + '.csv'
    with open(file_name, 'r') as f:
        data = [row for row in csv.reader(f, delimiter=',')]
    return data


def seed_courses():
    names = {'stony': 'Stony Ford', 'hickory': 'Hickory Hill'}
    courses = get_courses()
    for course_name in courses.keys():
        course = GolfCourse(nickname=course_name, name=names[course_name])
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


def seed_golfers():
    for username in ['daryl', 'kim', 'ryan']:
        user = User(username=username)
        user.set_password(DEFAULT_PASSWORD)
        user.default_tees = 'red' if username == 'kim' else 'white'
        db.session.add(user)

        data = get_golfer(username)
        if len(data) > 0:
            for row in data:
                course = GolfCourse.query.filter_by(nickname=row[1]).first()
                tee = course.get_tee_by_color(user.default_tees)
                golf_round = GolfRound(date=parse(row[0]), tee=tee)
                user.rounds.append(golf_round)
                for i in range(1, 19):
                    score = HoleScore(hole=i, score=int(row[i + 3]),
                                      putts=int(row[i + 21]))
                    golf_round.scores.append(score)
                    score.set_gir(gir=None)
                golf_round.calc_totals()
                golf_round.calc_handicap()
    db.session.commit()


if __name__ == '__main__':
    seed_courses()
    seed_golfers()
