from app import db
from pandas import Series


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column('username', db.String(32), unique=True, index=True)
    password = db.Column('password', db.Binary(128))

    default_tees = db.Column(db.String(32))

    rounds = db.relationship('GolfRound', backref='user', lazy='dynamic',
                             cascade="save-update, delete")

    def get_handicap(self, round_id):
        return self.rounds.filter_by(id=round_id).first().handicap_index

    def get_previous_round(self, golf_round):
        rounds = self.rounds.all()
        return rounds[rounds.index(golf_round) - 1]

    def get_rounds_thru(self, golf_round):
        rounds = self.rounds.all()
        return rounds[:rounds.index(golf_round) + 1]

    def _mavg(self, stats, period=20):
        return Series(stats).ewm(period).mean().iloc[-1]

    def get_mavg_score(self, golf_round):
        stats = [r.total_score for r in self.get_rounds_thru(golf_round)]
        return self._mavg(stats)

    def get_mavg_putts(self, golf_round):
        stats = [r.total_putts for r in self.get_rounds_thru(golf_round)]
        return self._mavg(stats)

    def get_mavg_gir(self, golf_round):
        stats = [r.total_gir for r in self.get_rounds_thru(golf_round)]
        return self._mavg(stats)

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
