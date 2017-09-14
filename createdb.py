from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask('app')
app.config.from_object('config')

db = SQLAlchemy(app)

db.create_all()
