from flask import request

from golf_stats import app


@app.before_request
def before_request():
    # in case of changes to template files
    app.jinja_env.cache = {}


app.run(debug=True, host='0.0.0.0')
