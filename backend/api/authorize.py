from functools import wraps

from flask import jsonify
from flask_login import current_user


def check_authorization(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if current_user.is_authenticated:
            return func(*args, **kwargs)
        return jsonify(error='not authorized')
    return wrapper
