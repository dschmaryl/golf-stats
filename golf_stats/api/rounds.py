from flask import g, jsonify
from flask_login import current_user

from golf_stats import app
from golf_stats.models import Hole, Round


@app.route('/api/rounds')
def get_rounds():
    if current_user.is_authenticated:
        rounds = Round.query.all()
        return jsonify({r.id: r.date for r in rounds})
    else:
        return jsonify(error='not authorized')


@app.route('/api/round/<round_id>')
def get_round(round_id):
    if current_user.is_authenticated:
        golf_round = Round.query.get(round_id)
        if golf_round:
            if g.user.username == golf_round.user.username:
                return jsonify(golf_round.as_dict())
            else:
                return jsonify(error='round belongs to another user')
        else:
            return jsonify(error='not found')
    return jsonify(error='not authorized')


@app.route('/api/hole/<hole_id>')
def get_hole(hole_id):
    if current_user.is_authenticated:
        hole = Hole.query.get(hole_id)
        if hole_id:
            if g.user.username == hole.round.user.username:
                return jsonify(hole.as_dict())
            else:
                return jsonify(error='hole belongs to another user')
        else:
            return jsonify(error='not found')
    return jsonify(error='not authorized')
