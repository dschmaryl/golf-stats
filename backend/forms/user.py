from wtforms import Form, SelectField, StringField, SubmitField, validators
from wtforms.widgets import PasswordInput
from flask_wtf import RecaptchaField


class UserRegistrationForm(Form):
    cancel = SubmitField()
    username = StringField(
        'username',
        [validators.DataRequired(message='enter username'),
         validators.length(max=32)]
    )
    password = StringField(
        'old_password',
        [validators.DataRequired(message='enter password')],
        widget=PasswordInput(hide_value=False),
    )
    default_tees = SelectField('color', coerce=int)
    recaptcha = RecaptchaField()


class UserSettingsForm(Form):
    cancel = SubmitField()
    username = StringField(
        'username',
        [validators.DataRequired(message='enter username'),
         validators.length(max=32)]
    )
    change_password = SubmitField()
    default_tees = SelectField('color', coerce=int)
