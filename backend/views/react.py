from flask import send_from_directory
from flask_login import login_required

from backend import app, base_dir


@app.route('/react/index')
@app.route('/react/')
@app.route('/react')
@login_required
def rindex():
    build_dir = str(base_dir / 'frontend' / 'build')
    return send_from_directory(build_dir, 'index.html')
