from flask import request, send_from_directory
from golf_stats import app


@app.route('/robots.txt')
@app.route('/humans.txt')
def static_file():
    return send_from_directory(app.static_folder, request.path[1:])
