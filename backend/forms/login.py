from wtforms import Form, PasswordField, StringField, validators


class LoginForm(Form):
    username = StringField(
        'username',
        [validators.DataRequired(message='enter username'),
         validators.length(max=24)]
    )
    password = PasswordField(
        'password',
        [validators.DataRequired(message='enter password'),
         validators.length(max=24)]
    )
