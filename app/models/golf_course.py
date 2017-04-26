from datetime import date

from app import db


class GolfCourse(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    nickname = db.Column(db.String(32), unique=True, index=True)
    name = db.Column(db.String(64))

    tees = db.relationship('Tee', backref='course', lazy='dynamic',
                           cascade="save-update, delete")

    def get_tee_by_color(self, color):
        try:
            return self.tees.filter_by(color=color)[-1]
        except IndexError:
            return None

    def get_new_tee(self):
        tee = Tee(date=date.today())
        self.tees.append(tee)
        return tee

    def __repr__(self):
        return '<Course %r>' % (self.name)


class Tee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('golf_course.id'))

    date = db.Column(db.DateTime)
    color = db.Column(db.String(32))
    rating = db.Column(db.Float)
    slope = db.Column(db.Integer)

    holes = db.relationship('Hole', backref='tee', lazy='dynamic',
                            cascade="save-update, delete")

    rounds = db.relationship('GolfRound', backref='tee', lazy='dynamic')

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        for i in range(1, 19):
            self.holes.append(Hole(hole=i))

    def get_hole(self, hole):
        return self.holes.filter_by(hole=hole).first()

    def get_total_par(self):
        return sum([h.par for h in self.holes])

    def __repr__(self):
        return '<Tee %r>' % (self.color)


class Hole(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tee_id = db.Column(db.Integer, db.ForeignKey('tee.id'))

    hole = db.Column(db.Integer)
    par = db.Column(db.Integer)
    handicap = db.Column(db.Integer)
    yardage = db.Column(db.Integer)

    def __repr__(self):
        return '<Hole %r>' % (self.hole)
