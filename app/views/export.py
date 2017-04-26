import pathlib

from flask import send_from_directory
from flask_login import login_required
from app import app

from app.utils import run_export

@app.route('/export', methods=['GET', 'POST'])
@login_required
def export_data():
    run_export()
    path = pathlib.Path(__file__).resolve().parent.parent.parent / 'data'
    return send_from_directory(directory=str(path), filename='export_data.pk')
