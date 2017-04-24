from app import db


class HoleScore(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    round_id = db.Column(db.Integer, db.ForeignKey('golf_round.id'))

    hole = db.Column(db.Integer)
    score = db.Column(db.Integer)
    putts = db.Column(db.Integer)
    gir = db.Column(db.Integer)  # 0: false, 1: true

    par = db.Column(db.Integer)
    yardage = db.Column(db.Integer)
    handicap = db.Column(db.Integer)

    adjusted_score = db.Column(db.Integer)

    def get_par(self):
        return self.round.tee.get_hole(self.hole).par

    def set_gir(self, gir):
        self.gir = int(gir) if gir else self._calc_gir()

    def set_hole_stats(self):
        course_hole_data = self.round.tee.get_hole(self.hole)
        self.par = course_hole_data.par
        self.yardage = course_hole_data.yardage
        self.handicap = course_hole_data.handicap

    def _calc_gir(self):
        par = self.get_par()
        return 1 if self.score - self.putts <= par - 2 else 0

    def __repr__(self):
        return '<Score %r>' % (self.id)
