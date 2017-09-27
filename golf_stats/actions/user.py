from sqlalchemy.exc import IntegrityError

from golf_stats import db
from golf_stats.models import User
from golf_stats.views.tees import TEES


def create_user(data):
    print(data.get('default_tees') in TEES)
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
            db.session.rollback()
            return {'error': 'username already exists'}
    else:
        return {'error': 'need username and password'}


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
