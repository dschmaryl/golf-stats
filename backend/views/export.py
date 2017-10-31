from flask import send_from_directory
from flask_login import current_user, login_required

from backend import app
from backend.utils import export_all


@app.route('/export.pk')
@login_required
def export_data():
    if current_user.username == 'daryl':
        export_all()
        return send_from_directory(app.static_folder, 'export.pk')
