from app import db


class HoleScore(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    round_id = db.Column(db.Integer, db.ForeignKey('golf_round.id'))

    hole = db.Column(db.Integer)
    score = db.Column(db.Integer)
    putts = db.Column(db.Integer)
    gir = db.Column(db.Integer)  # 0: false, 1: true, 2: unknown

    adjusted_score = db.Column(db.Integer)

    def set_gir(self, gir):
        self.gir = int(gir) if gir else self._calc_gir()

    def _calc_gir(self):
        par = self.round.tee.get_hole(self.hole).par
        return 1 if self.score - self.putts <= par - 2 else 0

    def __repr__(self):
        return '<Score %r>' % (self.id)
