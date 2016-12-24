from app import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column('username', db.String(32), unique=True, index=True)
    password = db.Column('password', db.String(32))

    default_tees = db.Column(db.String(32))

    rounds = db.relationship('Round', backref='user', lazy='dynamic',
                             cascade="save-update, delete")

    def get_handicap(self, round_id):
        return self.rounds.filter_by(id=round_id).first().handicap_index

    def get_last_round(self):
        return self.rounds.all()[-1]

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


class Round(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    tee_id = db.Column(db.Integer, db.ForeignKey('tee.id'))

    date = db.Column(db.DateTime)
    notes = db.Column(db.String(128))

    total_score = db.Column(db.Integer)
    total_putts = db.Column(db.Integer)
    total_gir = db.Column(db.Integer)

    handicap_index = db.Column(db.Float)

    scores = db.relationship('Score', backref='round', lazy='dynamic',
                             cascade="save-update, delete")

    def get_score_for_hole(self, hole):
        return self.scores.filter_by(hole=hole).first()

    def calc_totals(self):
        self.total_score, self.total_putts, self.total_gir = 0, 0, 0
        for s in self.scores:
            self.total_score += s.score
            self.total_putts += s.putts
            self.total_gir += s.gir

    def __repr__(self):
        return '<Round %r>' % (self.date)


class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    round_id = db.Column(db.Integer, db.ForeignKey('round.id'))

    hole = db.Column(db.Integer)
    score = db.Column(db.Integer)
    putts = db.Column(db.Integer)
    gir = db.Column(db.Integer)  # 0: false, 1: true, 2: unknown

    adjusted_score = db.Column(db.Integer)

    def __repr__(self):
        return '<Score %r>' % (self.id)


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    nickname = db.Column(db.String(32), unique=True, index=True)
    name = db.Column(db.String(64))

    tees = db.relationship('Tee', backref='course', lazy='dynamic',
                           cascade="save-update, delete")

    def get_tee_by_color(self, color):
        return self.tees.filter_by(color=color)[-1]

    def __repr__(self):
        return '<Course %r>' % (self.name)


class Tee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))

    date = db.Column(db.DateTime)
    color = db.Column(db.String(32))
    rating = db.Column(db.Float)
    slope = db.Column(db.Integer)

    holes = db.relationship('Hole', backref='tee', lazy='dynamic',
                            cascade="save-update, delete")

    rounds = db.relationship('Round', backref='tee', lazy='dynamic')

    def get_hole(self, hole):
        return self.holes.filter_by(hole=hole).first()

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
