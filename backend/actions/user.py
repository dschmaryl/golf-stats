from sqlalchemy.exc import IntegrityError

from backend import db
from backend.models import User
from backend.views.tees import TEES


def create_user(data):
    try:
        new_user = User(username=data['username'])
        new_user.set_password(data['password'])
    except KeyError as error:
        return {'error': 'KeyError: %s' % error}

    default_tees = data.get('default_tees')
    if default_tees in TEES:
        new_user.default_tees = default_tees

    try:
        db.session.add(new_user)
        db.session.commit()
        return {'success': True}
    except IntegrityError:
        db.session.rollback()
        return {'error': 'IntegrityError'}


def update_user(data):
    user = User.query.get(data.get('id'))
    if not user:
        return {'error': 'user not found'}

    if data.get('username'):
        user.username = data['username']
    if data.get('password'):
        user.set_password(data['password'])
    if data.get('default_tees'):
        user.default_tees = data['default_tees']

    try:
        db.session.commit()
        return {'success': True}
    except IntegrityError:
        db.session.rollback()
        return {'error': 'IntegrityError'}
