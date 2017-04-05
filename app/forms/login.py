from wtforms import Form, PasswordField, StringField, validators


class LoginForm(Form):
    username = StringField('username', [
        validators.DataRequired(message='enter username')
        ])
    password = PasswordField('password', [
        validators.DataRequired(message='enter password')
        ])
