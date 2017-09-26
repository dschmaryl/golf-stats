from flask import g, jsonify

from golf_stats import app
from golf_stats.models import User

from .authorize import check_authorization


@app.route('/api/users')
@check_authorization
def get_users():
    return jsonify({u.id: u.username for u in User.query.all()})


@app.route('/api/user/<user_id>')
@check_authorization
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        if g.user.username == user.username:
            return jsonify(user.as_dict())
        else:
            return jsonify(error='not permitted')
    else:
        return jsonify(error='not found')
