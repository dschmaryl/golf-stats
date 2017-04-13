from wtforms import Form, PasswordField, StringField, SubmitField, validators
from wtforms.widgets import PasswordInput


class ChangePasswordForm(Form):
    old_password = StringField(
        'old_password',
        [validators.DataRequired(message='please enter old password')],
        widget=PasswordInput(hide_value=False)
        )
    new_password = StringField(
        'new_password',
        [validators.DataRequired(message='please enter new password')],
        widget=PasswordInput(hide_value=False)
        )
    re_password = StringField(
        're_password',
        [validators.DataRequired(message='please re-enter  password'),
         validators.EqualTo('new_password', message='passwords must match')],
        widget=PasswordInput(hide_value=False)
        )
    cancel = SubmitField('cancel')
