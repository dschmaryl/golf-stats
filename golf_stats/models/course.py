from datetime import date

from golf_stats import db


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    nickname = db.Column(db.String(32), unique=True, index=True)
    name = db.Column(db.String(64))

    tees = db.relationship('CourseTee', backref='course', lazy='dynamic',
                           cascade="save-update, delete")

    def get_tee_by_color(self, color):
        try:
            return self.tees.filter_by(color=color)[-1]
        except IndexError:
            return None

    def get_new_tee(self, color='white'):
        new_tee = CourseTee(color=color, date=date.today())
        self.tees.append(new_tee)
        return new_tee

    def as_dict(self):
        return {
            'id': self.id,
            'nickname': self.nickname,
            'name': self.name,
            'tees': {t.id: t.color for t in self.tees}
        }

    def __repr__(self):
        return '<Course %r>' % (self.name)


class CourseTee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))

    name = db.Column(db.String(32))
    date = db.Column(db.DateTime)
    color = db.Column(db.String(32))
    gender = db.Column(db.String(8))

    rating = db.Column(db.Float)
    slope = db.Column(db.Integer)

    front_9_rating = db.Column(db.Float)
    front_9_slope = db.Column(db.Integer)
    back_9_rating = db.Column(db.Float)
    back_9_slope = db.Column(db.Integer)

    bogey_rating = db.Column(db.Float)

    course_holes = db.relationship('CourseHole', backref='tee', lazy='dynamic',
                                   cascade='save-update, delete')

    rounds = db.relationship('Round', backref='tee', lazy='dynamic')

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        for i in range(1, 19):
            self.course_holes.append(CourseHole(hole_number=i))

    def get_hole(self, hole_number):
        return self.course_holes.filter_by(hole_number=hole_number).first()

    def get_total_par(self):
        return sum([course_hole.par for course_hole in self.course_holes])

    def as_dict(self):
        return {
            'id': self.id,
            'course_id': self.id,
            'name': self.name,
            'date': self.date,
            'color': self.color,
            'gender': self.gender,
            'rating': self.rating,
            'slope': self.slope,
            'front_9_rating': self.front_9_rating,
            'front_9_slope': self.front_9_slope,
            'back_9_rating': self.back_9_rating,
            'back_9_slope': self.back_9_slope,
            'bogey_rating': self.bogey_rating,
            'course_holes': {h.id: h.hole_number for h in self.course_holes},
            'rounds': {r.id: r.date for r in self.rounds}
        }

    def __repr__(self):
        return '<Tee %r>' % (self.color)


class CourseHole(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tee_id = db.Column(db.Integer, db.ForeignKey('course_tee.id'))

    hole_number = db.Column(db.Integer)
    par = db.Column(db.Integer)
    yardage = db.Column(db.Integer)
    handicap = db.Column(db.Integer)

    def as_dict(self):
        return {
            'id': self.id,
            'tee_id': self.tee_id,
            'hole_number': self.hole_number,
            'par': self.par,
            'yardage': self.yardage,
            'handicap': self.handicap
        }

    def __repr__(self):
        return '<CourseHole %r>' % (self.hole)
