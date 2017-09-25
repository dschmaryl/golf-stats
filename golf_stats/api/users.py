from flask import g, jsonify
from flask_login import current_user

from golf_stats import app
from golf_stats.models import User


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
