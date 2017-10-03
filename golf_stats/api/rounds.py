from flask import g, jsonify, request

from golf_stats import app
from golf_stats.models import Hole, Round, User
from golf_stats.actions import update_round
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
    if hole:
        if g.user.username == hole.round.user.username:
            return jsonify(hole.as_dict())
        else:
            return jsonify(error='hole belongs to another user')
    else:
        return jsonify(error='not found')


@app.route('/api/add_round', methods=['POST'])
@check_authorization
def add_round():
    try:
        if g.user.username == User.query.get(int(request.form['user_id'])):
            return jsonify(update_round(request.get_json()))
        else:
            return jsonify(error='not permitted')
    except ValueError as error:
        return jsonify(error='ValueError: %s' % error)
    except TypeError as error:
        return jsonify(error='TypeError: %s' % error)
    except KeyError as error:
        return jsonify(error='KeyError: %s' % error)
