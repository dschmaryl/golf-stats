from flask import g, jsonify, request

from backend import app
from backend.models import Hole, Round, User
from backend.actions import update_round
from .authorize import check_authorization


@app.route('/api/user/<user_id>/get_rounds')
@check_authorization
def get_rounds(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({r.id: r.as_dict() for r in user.get_rounds()})
    else:
        return jsonify(error='user not found')


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
    if hole:
        if g.user.username == hole.round.user.username:
            return jsonify(hole.as_dict())
        else:
            return jsonify(error='hole belongs to another user')
    else:
        return jsonify(error='not found')


@app.route('/api/add_round', methods=['POST'])
@app.route('/api/update_round', methods=['POST'])
@check_authorization
def post_round():
    try:
        if g.user.username == User.query.get(int(request.form['user_id'])):
            return jsonify(update_round(request.get_json()))
        else:
            return jsonify(error='not permitted')
    except (KeyError, TypeError, KeyError) as error:
        return jsonify(error='%s: %s' % (type(error).__name__, error))
