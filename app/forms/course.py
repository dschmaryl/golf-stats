from datetime import date

from wtforms import (DateField, FloatField, Form, IntegerField, SelectField,
                     StringField, SubmitField, TextAreaField, validators)

from app.models import Course


TEES = ['white', 'red', 'blue']


class CourseForm(Form):
    cancel = SubmitField('cancel')
    delete = SubmitField('delete')

    name = StringField('name', [
        validators.InputRequired(message='enter course name'),
        validators.Length(min=4, message='name too short'),
        validators.Length(max=48, message='name too long')
        ])
    nickname = StringField('nickname', [
        validators.InputRequired(message='enter course nickname'),
        validators.Length(min=4, message='nickname too short'),
        validators.Length(max=24, message='nickname too long'),
        validators.Regexp(r'^[a-z]+$',
                          message='only lowercase letters in nickname')
        ])

    def validate(self):
        if not super().validate():
            return False

        if Course.query.filter_by(nickname=self.nickname.data).first():
            self.nickname.errors.append('course nickname already exists')
            return False

        return True


class CourseTeeForm(Form):
    cancel = SubmitField('cancel')
    delete = SubmitField('delete')

    date = DateField('date', default=date.today())

    choices = [(i, TEES[i]) for i in range(len(TEES))]
    color = SelectField('color', choices=choices, coerce=int)

    rating = FloatField('rating', [validators.InputRequired('enter rating')])
    slope = IntegerField('slope', [validators.InputRequired('enter slope')])

    front_9_rating = FloatField('front_9_rating', [validators.Optional()])
    front_9_slope = IntegerField('front_9_slope', [validators.Optional()])
    back_9_rating = FloatField('back_9_rating', [validators.Optional()])
    back_9_slope = IntegerField('back_9_slope', [validators.Optional()])

    bogey_rating = FloatField('bogey_rating', [validators.Optional()])

    def validate(self):
        if not super().validate():
            return False

        if self.rating.data < 0 or 200 < self.rating.data:
            self.rating.errors.append('invalid rating')
            return False

        if self.slope.data < 55 or 155 < self.slope.data:
            self.slope.errors.append('invalid slope')
            return False

        return True
