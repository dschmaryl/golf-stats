from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from backend import app, db
from backend.utils import export_all, import_all


migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)


@manager.command
def create_db():
    db.create_all()


@manager.command
def import_db():
    import_all()


@manager.command
def export_db():
    export_all()


if __name__ == '__main__':
    manager.run()
