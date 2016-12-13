import pathlib

BASE_DIR = pathlib.Path(__file__).resolve().parent

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + str(BASE_DIR / 'stats.db')
SQLALCHEMY_MIGRATE_REPO = str(BASE_DIR / 'migrations')
SQLALCHEMY_TRACK_MODIFICATIONS = False

WTF_CSRF_ENABLED = True
SECRET_KEY = 'change-this-to-something-better'
