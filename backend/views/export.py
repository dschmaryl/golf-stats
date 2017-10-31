import pathlib

from flask import send_from_directory
from flask_login import current_user, login_required

from backend import app


@app.route('/export.pk')
@login_required
def export_data():
    if current_user.username == 'daryl':
        return send_from_directory(app.static_folder, request.path[1:])
