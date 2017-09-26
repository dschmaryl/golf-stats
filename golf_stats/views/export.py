import pathlib

from flask import send_from_directory
from flask_login import current_user, login_required

from golf_stats import app


@app.route('/export', methods=['GET', 'POST'])
@login_required
def export_data():
    if current_user.username == 'daryl':
        path = pathlib.Path(__file__).resolve().parent.parent.parent / 'data'
        return send_from_directory(directory=str(path),
                                   filename='export_data.pk')
