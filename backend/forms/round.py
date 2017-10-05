from datetime import date
from flask import request
from wtforms import (DateField, Form, SelectField, SubmitField, TextAreaField,
                     validators)

from backend.models import Course


class RoundForm(Form):
    cancel = SubmitField('cancel')
    delete = SubmitField('delete')

    date = DateField('date', default=date.today())
    course = SelectField('course', coerce=int)
    tee_color = SelectField('tee_color', coerce=int)

    notes = TextAreaField('notes', [
        validators.Optional(),
        validators.length(max=128, message='notes too long'),
    ])

    def validate(self):
        self.course.data = int(request.form.get('course'))
        self.tee_color.data = int(request.form.get('tee_color'))

        if not super().validate():
            return False

        course = Course.query.get(self.course.data)
        if not course:
            self.course.errors.append('course not found')
            return False

        tee_colors = [color for k, color in self.tee_color.choices]
        tee_color = tee_colors[self.tee_color.data]
        if not course.get_tee_by_color(tee_color):
            self.tee_color.errors.append('%s tees not found' % tee_color)
            return False

        return True
