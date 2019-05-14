from backend import db


class Hole(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    round_id = db.Column(db.Integer, db.ForeignKey('round.id'))

    hole_number = db.Column(db.Integer)

    strokes = db.Column(db.Integer)
    putts = db.Column(db.Integer)

    gir = db.Column(db.Boolean, nullable=False, default=False)

    fairway_hit = db.Column(db.Boolean, nullable=False, default=False)
    sand_save = db.Column(db.Integer)  # 0: fail, 1: success, None: none

    par = db.Column(db.Integer)
    yardage = db.Column(db.Integer)
    handicap = db.Column(db.Integer)

    # for eventually adding proper adjustment for single digit handicaps
    adjusted_strokes = db.Column(db.Integer)

    def set_course_hole_data(self):
        course_hole_data = self.round.tee.get_hole(self.hole_number)
        self.par = course_hole_data.par
        self.yardage = course_hole_data.yardage
        self.handicap = course_hole_data.handicap

    def set_gir(self, gir):
        self.gir = True if gir else self._calc_gir()

    def _calc_gir(self):
        return self.strokes - self.putts <= self.par - 2

    def as_dict(self):
        return {
            'id': self.id,
            'round_id': self.round_id,
            'hole_number': self.hole_number,
            'strokes': self.strokes,
            'putts': self.putts,
            'gir': self.gir,
            'fairway_hit': self.fairway_hit,
            'sand_save': self.sand_save,
            'par': self.par,
            'yardage': self.yardage,
            'handicap': self.handicap,
            'adjusted_strokes': self.adjusted_strokes
        }

    def __repr__(self):
        return '<Hole %r>' % (self.id)
