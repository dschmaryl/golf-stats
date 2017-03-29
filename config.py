import os
import pathlib

BASE_DIR = pathlib.Path(__file__).resolve().parent

SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

SQLALCHEMY_MIGRATE_REPO = str(BASE_DIR / 'migrations')
SQLALCHEMY_TRACK_MODIFICATIONS = False

WTF_CSRF_ENABLED = True
SECRET_KEY = os.environ['SECRET_KEY']
