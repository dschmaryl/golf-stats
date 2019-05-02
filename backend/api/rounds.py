from flask import g, jsonify, request

from backend import app
from backend.models import Hole, Round
from backend.actions import update_round
from .authorize import check_auth


@app.route('/api/round/<round_id>')
@check_auth
def get_round(round_id):
    golf_round = Round.query.get(round_id)
    if golf_round:
        if golf_round.user.username == g.current_user.username:
            return jsonify(golf_round.as_dict())
        return jsonify(error='round belongs to another user')
    return jsonify(error='not found')


@app.route('/api/round/hole/<hole_id>')
@check_auth
def get_hole(hole_id):
    hole = Hole.query.get(hole_id)
    if hole:
        if hole.round.user.username == g.current_user.username:
            return jsonify(hole.as_dict())
        return jsonify(error='hole belongs to another user')
    return jsonify(error='not found')


@app.route('/api/add_round', methods=['POST'])
@app.route('/api/update_round', methods=['POST'])
@check_auth
def post_round():
    try:
        return jsonify(update_round(request.get_json()))

    except (KeyError, TypeError, KeyError) as error:
        return jsonify(error='%s: %s' % (type(error).__name__, error))
