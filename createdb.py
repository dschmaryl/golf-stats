from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask('app')
app.config.from_object('config')

db = SQLAlchemy(app)


from app import models


db.create_all()
