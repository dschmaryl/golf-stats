from wtforms import Form, StringField, SubmitField, PasswordField, validators


class LoginForm(Form):
    username = StringField('username', [validators.DataRequired()])
    password = PasswordField('password', [validators.DataRequired()])


class ChangePasswordForm(Form):
    old_password = PasswordField('old_password', [validators.DataRequired()])
    new_password = PasswordField('new_password', [validators.DataRequired()])
    re_password = PasswordField('re_password', [
        validators.DataRequired(),
        validators.EqualTo('new_password', message='passwords must match')
        ])
    cancel = SubmitField('cancel')
