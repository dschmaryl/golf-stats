from flask import render_template

from golf_stats import app, db


@app.errorhandler(404)
def not_found_error(error):
    error_msg = "404 - item not found"
    return (render_template('error.html', error=error_msg, title='404 error'),
            404)


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    error_msg = "500 - internal server error"
    return (render_template('error.html', error=error_msg, title='500 error'),
            500)
