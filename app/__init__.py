#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask
from flask_admin import Admin
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy


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


# TODO: put this somewhere better
TEES = ['white', 'red', 'blue']


from app import views, models
