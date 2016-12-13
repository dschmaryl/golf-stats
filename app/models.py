from stats import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True)
    scores = db.relationship('Score', backref='golfer', lazy='dynamic')

    def __repr__(self):
        return '<User %r>' % (self.name)


class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.DateTime)

    # this might need adjustment
    course = db.Column(db.String(64))
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))

    tee = db.Column(db.String(64))

    # figure out how to have a row for each hole with strokes, green, putts.
    score = db.Column(db.Integer)
    putts = db.Column(db.Integer)
    greens = db.Column(db.Integer)  # use 1 or 0

    course_handicap = db.Column(db.Integer)
    adj_score = db.Column(db.Integer)
    handicap_index = db.Column(db.Float)

    def __repr__(self):
        return '<Score %r>' % (self.date)


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))

    # this is possibly wrong
    rounds = db.relationship('Score', backref='round', lazy='dynamic')

    # need each tee, then each hole for each tee with par, yardage, handicap

    def __repr__(self):
        return '<Course %r>' % (self.name)