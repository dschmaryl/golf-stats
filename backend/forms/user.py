from wtforms import Form, SelectField, StringField, SubmitField, validators
from wtforms.widgets import PasswordInput
from flask_wtf import RecaptchaField


class UserForm(Form):
    cancel = SubmitField('cancel')

    recaptcha = RecaptchaField()

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
