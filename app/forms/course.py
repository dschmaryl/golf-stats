from wtforms import Form, StringField, SubmitField, validators


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
