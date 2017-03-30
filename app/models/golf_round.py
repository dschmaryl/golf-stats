from app import db
from .hole_score import HoleScore


class GolfRound(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    tee_id = db.Column(db.Integer, db.ForeignKey('tee.id'))

    date = db.Column(db.DateTime)
    notes = db.Column(db.String(128))

    total_score = db.Column(db.Integer)
    total_putts = db.Column(db.Integer)
    total_gir = db.Column(db.Integer)

    handicap_index = db.Column(db.Float)

    scores = db.relationship('HoleScore', backref='round', lazy='dynamic',
                             cascade="save-update, delete")

    def __init__(self, **kwargs):
        super(GolfRound, self).__init__(**kwargs)
        for i in range(1, 19):
            self.scores.append(HoleScore(hole=i, score=0, putts=0, gir=0))

    def get_score_for_hole(self, hole):
        return self.scores.filter_by(hole=hole).first()

    def calc_totals(self):
        self.total_score, self.total_putts, self.total_gir = 0, 0, 0
        for s in self.scores:
            self.total_score += s.score
            self.total_putts += s.putts
            self.total_gir += s.gir if s.gir else 0

    def calc_handicap(self):
        rounds = self.user.get_rounds()
        round_idx = rounds.index(self)
        rounds = rounds[max(0, round_idx - 19):round_idx + 1]
        if len(rounds) < 5:
            # not enough rounds yet
            self.handicap_index = 50.0
            return
        num_of_diffs_used = {
            5: 1, 6: 1, 7: 2, 8: 2, 9: 3, 10: 3, 11: 4, 12: 4,
            13: 5, 14: 5, 15: 6, 16: 6, 17: 7, 18: 8, 19: 9, 20: 10
            }[len(rounds)]
        diffs = sorted([r.calc_diff() for r in rounds])[:num_of_diffs_used]
        handicap_str = str(sum(diffs) / len(diffs) * .96)
        self.handicap_index = float(handicap_str[:handicap_str.find('.') + 2])

    def calc_diff(self):
        if self == self.user.get_rounds()[0]:
            return self.total_score
        if len(self.scores.all()) == 0:
            # large value so as not to be included. this is stupid
            return 1000
        old_handicap = self.user.get_previous_round(self).handicap_index
        course_handicap = round(old_handicap * self.tee.slope / 113, 0)
        if course_handicap < 10:
            # TODO: max is double bogey. this needs to be fixed
            max_score = 7
        else:
            max_score = int(course_handicap / 10 + 6)

        adj_score = sum([min(max_score, s.score) for s in self.scores])
        rating = self.tee.rating * len(self.scores.all()) / 18
        slope = self.tee.slope * len(self.scores.all()) / 18
        return (adj_score - rating) * 113 / slope

    def __repr__(self):
        return '<Round %r>' % (self.date)
