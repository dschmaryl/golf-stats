#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_login import LoginManager, current_user
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt


app = Flask(__name__)
app.config.from_object('config')
app.static_folder = 'static'
app.static_url_path = ''

admin = Admin(app, name='golf-stats', template_mode='bootstrap3')
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


from app import views, models


class AdminView(ModelView):
    def is_accessible(self):
        if not current_user.is_authenticated:
            return False
        return current_user.username == 'daryl'


admin.add_view(AdminView(models.User, db.session))
admin.add_view(AdminView(models.Round, db.session))
admin.add_view(AdminView(models.Hole, db.session))
admin.add_view(AdminView(models.Course, db.session))
