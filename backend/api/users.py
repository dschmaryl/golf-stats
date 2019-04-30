from flask import g, jsonify, request

from backend import app
from backend.models import User
from .authorize import check_auth, generate_token, verify_token


@app.route('/api/get_token', methods=['POST'])
def get_token():
    incoming = request.get_json()
    user = User.query.filter_by(username=incoming['username']).first()
    if user:
        if user.check_password(incoming['password']):
            return jsonify(token=generate_token(user))

    return jsonify(error='unable to get token'), 403


@app.route("/api/is_token_valid", methods=["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid=True)

    return jsonify(token_is_valid=False), 403


@app.route('/api/user_id')
@check_auth
def get_user_id():
    return jsonify(g.current_user.user_id)


@app.route('/api/user/rounds')
@check_auth
def get_rounds():
    rounds = g.current_user.get_rounds()
    return jsonify({i: rounds[i].as_dict() for i in range(len(rounds))})


@app.route('/api/user/stats')
@check_auth
def get_user_stats():
    return jsonify(g.current_user.get_all_averages_by_season())
