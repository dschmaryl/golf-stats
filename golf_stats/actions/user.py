from sqlalchemy.exc import IntegrityError

from golf_stats import db
from golf_stats.models import User
from golf_stats.views.tees import TEES


def create_user(data):
    try:
        new_user = User(username=data['username'])
        new_user.set_password(data['password'])
    except KeyError:
        return {'error': 'need username and password'}

    default_tees = data.get('default_tees')
    if default_tees in TEES:
        new_user.default_tees = default_tees

    try:
        db.session.add(new_user)
        db.session.commit()
        return {'success': True}
    except IntegrityError:
        db.session.rollback()
        return {'error': 'username already exists'}



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
        return {'error': 'integrityerror'}
