from flask import request, send_from_directory

from backend import app


@app.route('/robots.txt')
@app.route('/humans.txt')
@app.route('/manifest.json')
@app.route('/favicon.ico')
@app.route('/favicon.png')
def static_file():
    return send_from_directory(app.static_folder, request.path[1:])
