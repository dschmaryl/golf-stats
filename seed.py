#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import csv
import sys
from dateutil.parser import parse

from app import db
from app.models import *


def get_data(golfer):
    file_name = 'data/' + golfer + '.csv'
    with open(file_name, 'r') as f:
        data = [row for row in csv.reader(f, delimiter=',')][1:]
    return data


def add_scores(row, round_id):
    for i in range(18):
        hole = 'hole%i' % i
        score = row[i+4]
        putts = row[i+22]
        gir = 2
        score = Score(round_id=round_id, hole=hole, score=score, putts=putts,
                      gir=gir)
        db.session.add(score)
    db.session.commit()


def add_round(row, user_id, tee_color):
    date = parse(row[0])
    course = Course.query.filter_by(nickname=row[1]).first()
    round_ = Round(date=parse(row[0]), user_id=user_id, course_id=course.id,
                   tee_color=tee_color)
    db.session.add(round_)
    db.session.commit()
    add_scores(row, round_.id)


def seed(golfer):
    user = User.query.filter_by(username=golfer).first()
    tee_color = 'red' if golfer == 'kim' else 'white'
    data = get_data(golfer)
    for row in data:
        add_round(row, user.id, tee_color)


if __name__ == '__main__':
    golfer = sys.argv[-1]
    if golfer in ['daryl', 'kim', 'ryan']:
        seed(golfer)
    else:
        print('golfer not valid')
