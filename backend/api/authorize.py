from functools import wraps

from flask import g, jsonify, request
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature

from backend import app
from backend.models import User


TWO_WEEKS = 1209600


def generate_token(user, expiration=TWO_WEEKS):
    serialized = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
    token = serialized.dumps({
        'id': user.id,
        'username': user.username,
    }).decode('utf-8')
    return token


def verify_token(token):
    serialized = Serializer(app.config['SECRET_KEY'])
    try:
        data = serialized.loads(token)
    except (BadSignature, SignatureExpired):
        return None

    return data


def check_auth(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization', None)
        if token:
            string_token = token.encode('ascii', 'ignore')
            verified = verify_token(string_token)

            if verified:
                user = User.query.get(verified.get('id'))
                if user:
                    g.current_user = user
                    return func(*args, **kwargs)

        return jsonify(error='not authorized'), 401

    return wrapper
