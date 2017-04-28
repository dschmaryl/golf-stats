from datetime import date
from wtforms import (DateField, Form, SelectField, SubmitField, TextAreaField,
                     validators)

from app.models import Course


TEES = ['white', 'red', 'blue']


class RoundForm(Form):
    cancel = SubmitField('cancel')
    delete = SubmitField('delete')

    date = DateField('date', default=date.today())

    courses = Course.query.all()
    choices = [(course.id, course.nickname) for course in courses]
    course = SelectField('course', choices=choices, coerce=int)

    choices = [(i, TEES[i]) for i in range(len(TEES))]
    tee_color = SelectField('tee_color', choices=choices, coerce=int)

    notes = TextAreaField('notes', [
        validators.Optional(),
        validators.length(max=128, message='notes too long'),
        ])

    def validate(self):
        if not super().validate():
            return False

        course = Course.query.get(self.course.data)
        if not course:
            self.course.errors.append('course not found')
            return False

        if not course.get_tee_by_color(TEES[self.tee_color.data]):
            self.tee_color.errors.append('%s tees not found' %
                                         TEES[self.tee_color.data])
            return False

        return True
