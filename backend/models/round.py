from math import ceil

from backend import db
from backend.dates import date_to_str
from .hole import Hole


class Round(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    tee_id = db.Column(db.Integer, db.ForeignKey('course_tee.id'))

    date = db.Column(db.DateTime)
    notes = db.Column(db.String(128))

    front_9_strokes = db.Column(db.Integer)
    front_9_putts = db.Column(db.Integer)
    front_9_gir = db.Column(db.Integer)

    back_9_strokes = db.Column(db.Integer)
    back_9_putts = db.Column(db.Integer)
    back_9_gir = db.Column(db.Integer)

    total_strokes = db.Column(db.Integer)
    total_putts = db.Column(db.Integer)
    total_gir = db.Column(db.Integer)

    par_3_avg = db.Column(db.Float)
    par_4_avg = db.Column(db.Float)
    par_5_avg = db.Column(db.Float)

    handicap_index = db.Column(db.Float)

    holes = db.relationship('Hole', backref='round', lazy='dynamic',
                            cascade="save-update, delete")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        for i in range(1, 19):
            self.holes.append(Hole(hole_number=i, strokes=0, putts=0,
                                   gir=False))

    def get_hole(self, hole_number):
        return self.holes.filter_by(hole_number=hole_number).first()

    def calc_totals(self):
        self.front_9_strokes, self.front_9_putts, self.front_9_gir = 0, 0, 0
        self.back_9_strokes, self.back_9_putts, self.back_9_gir = 0, 0, 0
        self.total_strokes, self.total_putts, self.total_gir = 0, 0, 0
        sum3, den3, sum4, den4, sum5, den5 = 0, 0, 0, 0, 0, 0

        for hole in self.holes:
            if hole.hole_number <= 9:
                self.front_9_strokes += hole.strokes
                self.front_9_putts += hole.putts
                if hole.gir:
                    self.front_9_gir += 1
            else:
                self.back_9_strokes += hole.strokes
                self.back_9_putts += hole.putts
                if hole.gir:
                    self.back_9_gir += 1

            if hole.par == 3:
                sum3 += hole.strokes
                den3 += 1
            elif hole.par == 4:
                sum4 += hole.strokes
                den4 += 1
            else:
                sum5 += hole.strokes
                den5 += 1

        self.par_3_avg = sum3 / den3 if den3 > 0 else 0
        self.par_4_avg = sum4 / den4 if den4 > 0 else 0
        self.par_5_avg = sum5 / den5 if den5 > 0 else 0

        self.total_strokes = self.front_9_strokes + self.back_9_strokes
        self.total_putts = self.front_9_putts + self.back_9_putts
        self.total_gir = self.front_9_gir + self.back_9_gir

    def calc_handicap(self):
        rounds = self.get_twenty_rounds()

        num_of_diffs_used = self.get_num_of_diffs(rounds)
        if num_of_diffs_used == 0:
            self.handicap_index = 50
            return None

        diffs = sorted([r.calc_diff() for r in rounds])[:num_of_diffs_used]

        # calculate handicap and truncate to one decimal place
        handicap_str = str(sum(diffs) / len(diffs) * .96)
        handicap = float(handicap_str[:handicap_str.find('.') + 2])

        self.handicap_index = min(handicap, 50)

    def get_twenty_rounds(self):
        # get rounds and slice to no more than 20 rounds with
        # self being the last round in the list
        rounds = self.user.get_rounds()
        round_idx = rounds.index(self)
        return rounds[max(0, round_idx - 19):round_idx + 1]

    def get_num_of_diffs(self, rounds):
        # return number of diffs to be used to calculate handicap based on
        # the number of rounds that have been recorded so far.
        #
        # if len(rounds) < 5:
        #     return 0
        # else:
        #     return {
        #         5: 1, 6: 1, 7: 2, 8: 2, 9: 3, 10: 3, 11: 4, 12: 4,
        #         13: 5, 14: 5, 15: 6, 16: 6, 17: 7, 18: 8, 19: 9, 20: 10
        #     }[len(rounds)]

        # my own version; i think its more fair to golfers with only a few
        # rounds entered
        return ceil(len(rounds)/2)

    def calc_diff(self):
        adjusted_score = self.get_adjusted_score()
        diff = (adjusted_score - self.tee.rating) * 113 / self.tee.slope
        return diff

    def get_adjusted_score(self):
        # previous handicap is needed to calculate the course handicap
        # for the current round which is used to adjust score
        previous_round = self.user.get_previous_round(self)
        if not previous_round:
            return self.total_strokes

        old_handicap = previous_round.handicap_index
        course_handicap = round(old_handicap * self.tee.slope / 113, 0)
        if course_handicap < 10:
            # TODO: max is double bogey. this needs to be fixed
            max_score = 7
        else:
            max_score = int(course_handicap / 10 + 6)

        # TODO: this needs to be refactored to fix single-digit handicap max
        adjusted_score = sum([min(max_score, hole.strokes)
                              for hole in self.holes])
        return adjusted_score

    def as_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'tee_id': self.tee_id,
            'date': date_to_str(self.date),
            'course': self.tee.course.nickname,
            'tee_color': self.tee.color,
            'notes': self.notes,
            'front_9_strokes': self.front_9_strokes,
            'front_9_putts': self.front_9_putts,
            'front_9_gir': self.front_9_gir,
            'back_9_strokes': self.back_9_strokes,
            'back_9_putts': self.back_9_putts,
            'back_9_gir': self.back_9_gir,
            'total_strokes': self.total_strokes,
            'total_putts': self.total_putts,
            'total_gir': self.total_gir,
            'par_3_avg': self.par_3_avg,
            'par_4_avg': self.par_4_avg,
            'par_5_avg': self.par_5_avg,
            'handicap_index': self.handicap_index,
            'holes': {h.hole_number: h.as_dict() for h in self.holes}
        }

    def __repr__(self):
        return '<Round %r>' % (self.date)
