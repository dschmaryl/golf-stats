from flask import g, jsonify
from flask_login import current_user

from app import app, db
from app.models import Hole, Round, User


@app.route('/api/users')
def get_users():
    if current_user.is_authenticated:
        return jsonify({u.id: u.username for u in User.query.all()})
    else:
        return jsonify(error='not permitted')


@app.route('/api/user/<user_id>')
def get_user(user_id):
    if current_user.is_authenticated:
        user = User.query.get(user_id)
        if user and g.user.username == user.username:
            return jsonify(user.as_dict())
    return jsonify(error='not permitted')


@app.route('/api/round/<round_id>')
def get_round(round_id):
    if current_user.is_authenticated:
        golf_round = Round.query.get(round_id)
        if golf_round and g.user.username == golf_round.user.username:
            return jsonify(golf_round.as_dict())
    return jsonify(error='not permitted')


@app.route('/api/hole/<hole_id>')
def get_hole(hole_id):
    if current_user.is_authenticated:
        hole = Hole.query.get(hole_id)
        if hole_id and g.user.username == hole.round.user.username:
            return jsonify(hole.as_dict())
    return jsonify(error='not permitted')
