import os
import pathlib

BASE_DIR = pathlib.Path(__file__).resolve().parent

SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

SQLALCHEMY_MIGRATE_REPO = str(BASE_DIR / 'migrations')
SQLALCHEMY_TRACK_MODIFICATIONS = False

SECRET_KEY = 'double-secret-probation'
