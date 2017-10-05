from flask import send_from_directory

from backend import app, base_dir


@app.route('/react')
@app.route('/react/')
@app.route('/react/index')
def rindex():
    build_dir = str(base_dir / 'frontend' / 'build')
    return send_from_directory(build_dir, 'index.html')
