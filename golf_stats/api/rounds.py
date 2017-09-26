from flask import g, jsonify

from golf_stats import app
from golf_stats.models import Hole, Round

from .authorize import check_authorization


@app.route('/api/rounds')
@check_authorization
def get_rounds():
    rounds = Round.query.all()
    return jsonify({r.id: r.date for r in rounds})


@app.route('/api/round/<round_id>')
@check_authorization
def get_round(round_id):
    golf_round = Round.query.get(round_id)
    if golf_round:
        if g.user.username == golf_round.user.username:
            return jsonify(golf_round.as_dict())
        else:
            return jsonify(error='round belongs to another user')
    else:
        return jsonify(error='not found')


@app.route('/api/round/hole/<hole_id>')
@check_authorization
def get_hole(hole_id):
    hole = Hole.query.get(hole_id)
    if hole_id:
        if g.user.username == hole.round.user.username:
            return jsonify(hole.as_dict())
        else:
            return jsonify(error='hole belongs to another user')
    else:
        return jsonify(error='not found')
