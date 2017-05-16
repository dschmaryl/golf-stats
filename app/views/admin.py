from flask_admin.contrib.sqla import ModelView
from flask_login import current_user

from app import admin, db
from app.models import Course, Hole, Round, User


class AdminView(ModelView):
    def is_accessible(self):
        if not current_user.is_authenticated:
            return False
        return current_user.username == 'daryl'


admin.add_view(AdminView(User, db.session))
admin.add_view(AdminView(Round, db.session))
admin.add_view(AdminView(Hole, db.session))
admin.add_view(AdminView(Course, db.session))
