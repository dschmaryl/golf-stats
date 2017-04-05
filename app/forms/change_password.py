from wtforms import Form, PasswordField, StringField, SubmitField, validators


class ChangePasswordForm(Form):
    old_password = PasswordField('old_password', [
        validators.DataRequired(message='please enter old password')
        ])
    new_password = PasswordField('new_password', [
        validators.DataRequired(message='please enter new password')
        ])
    re_password = PasswordField('re_password', [
        validators.DataRequired(message='please re-enter new password'),
        validators.EqualTo('new_password', message='passwords must match')
        ])
    cancel = SubmitField('cancel')
