from datetime import date
from wtforms import (DateField, Form, SelectField, SubmitField, TextAreaField,
                     validators)

from app.models import GolfCourse


TEE_COLORS = ['white', 'red', 'blue']


class GolfRoundForm(Form):
    new_round_flag = True
    cancel = SubmitField('cancel')
    delete = SubmitField('delete')

    date = DateField('date', default=date.today())

    courses = GolfCourse.query.all()
    choices = [(course.id, course.nickname) for course in courses]
    course = SelectField('course', choices=choices, coerce=int)

    choices = [(i, TEE_COLORS[i]) for i in range(len(TEE_COLORS))]
    tee_color = SelectField('tee_color', choices=choices, coerce=int)

    notes = TextAreaField('notes', [
        validators.Optional(),
        validators.length(max=128, message='notes too long'),
        ])

    def validate(self):
        # these need to be set for both valid and invalid forms
        self.course_data = self.course.choices[self.course.data - 1][1]
        self.tee_color_data = TEE_COLORS[self.tee_color.data]

        if not super().validate():
            return False

        course = GolfCourse.query.get(self.course.data)
        if not course:
            self.course.errors.append('course not found')
            return False

        if not course.get_tee_by_color(self.tee_color_data):
            self.tee_color.errors.append('%s tees not found for %s' %
                                         (self.tee_color_data,
                                          self.course_data))
            return False

        return True
