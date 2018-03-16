from wtforms import Form, PasswordField, StringField, SubmitField, validators


class LoginForm(Form):
    register = SubmitField('register')

    username = StringField(
        'username',
        [validators.DataRequired(message='enter username'),
         validators.length(max=24),
         validators.length(min=2)]
    )
    password = PasswordField(
        'password',
        [validators.DataRequired(message='enter password'),
         validators.length(max=24),
         validators.length(min=2)]
    )
