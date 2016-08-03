from stats import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True)

    def __repr__(self):
        return '<User %r>' % (self.name)


class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.DateTime)
    course = db.Column(db.String(64))
    tee = db.Column(db.String(64))

    # figure out how to have a row for each hole with strokes, green, putts.
    # greens should probably be saved as 1 or 0

    score = db.Column(db.Integer)
    putts = db.Column(db.Integer)
    greens = db.Column(db.Integer)
    course_handicap = db.Column(db.Integer)
    adj_score = db.Column(db.Integer)
    handicap_index = db.Column(db.Float)

    def __repr__(self):
        return '<Score %r>' % (self.date)


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))

    # need each tee, then each hole for each tee with par, yardage, handicap

    def __repr__(self):
        return '<Course %r>' % (self.name)
