from app import bcrypt, db
from pandas import Series

from .golf_round import GolfRound


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column('username', db.String(32), unique=True, index=True)
    password = db.Column('password', db.Binary(128))

    default_tees = db.Column(db.String(32))

    rounds = db.relationship('GolfRound', backref='user', lazy='dynamic',
                             cascade="save-update, delete")

    def get_handicap(self, round_id):
        return self.rounds.filter_by(id=round_id).first().handicap_index

    def get_rounds(self):
        return self.rounds.order_by(GolfRound.date).all()

    def get_latest_round(self):
        return self.get_rounds()[-1]

    def get_previous_round(self, golf_round):
        rounds = self.get_rounds()
        return rounds[rounds.index(golf_round) - 1]

    def get_rounds_thru(self, golf_round):
        rounds = self.get_rounds()
        return rounds[:rounds.index(golf_round) + 1]

    def _mavg(self, stats, period):
        return Series(stats).ewm(period).mean().iloc[-1]

    def get_mavg_score(self, golf_round, period=20):
        stats = [r.total_score for r in self.get_rounds_thru(golf_round)]
        return self._mavg(stats, period)

    def get_mavg_score_to_par(self, golf_round, period=20):
        stats = [r.total_score - r.tee.get_total_par()
                 for r in self.get_rounds_thru(golf_round) if r.total_score]
        return self._mavg(stats, period)

    def get_mavg_putts(self, golf_round, period=20):
        stats = [r.total_putts for r in self.get_rounds_thru(golf_round)]
        return self._mavg(stats, period)

    def get_mavg_gir(self, golf_round, period=20):
        stats = [r.total_gir for r in self.get_rounds_thru(golf_round)]
        return self._mavg(stats, period)

    ##
    # this all needs to be refactored its stupid
    ##
    def get_par_x_mavg(self, golf_round, par, period=20):
        stats = []
        for r in self.get_rounds_thru(golf_round)[-20:]:
            for i in range(1, 19):
                if r.tee.get_hole(i).par == par:
                    stats.append(r.get_hole(i).score)
        return self._mavg(stats, period)

    def recalc_handicaps(self, golf_round):
        rounds = self.get_rounds()
        for r in rounds[rounds.index(golf_round) + 1:]:
            r.calc_handicap()

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password)

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)
        except NameError:
            return str(self.id)

    def __repr__(self):
        return '<User %r>' % (self.username)
