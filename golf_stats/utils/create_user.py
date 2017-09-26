from sqlalchemy.exc import IntegrityError

from golf_stats import db
from golf_stats.models import User
from golf_stats.views.tees import TEES


def create_user(data):
    username = data.get('username')
    password = data.get('password')
    if username and password:
        new_user = User(username=username)
        db.session.add(new_user)
        new_user.set_password(password)
        default_tees = data.get('default_tees')
        if default_tees in TEES:
            new_user.default_tees = default_tees
        try:
            db.session.commit()
            return {'success': True}
        except IntegrityError:
            return {'error': 'username already exists'}

    return {'error': 'bad data'}
