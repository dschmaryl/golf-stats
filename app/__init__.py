#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config.from_object('config')
app.static_folder = 'static'
app.static_url_path = ''

bcrypt = Bcrypt(app)

db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

from app import views, models
