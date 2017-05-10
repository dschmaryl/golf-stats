from wtforms import Form, SelectField, StringField, SubmitField, validators
from wtforms.widgets import PasswordInput
from flask_wtf import RecaptchaField

from app.models import User


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

    def validate(self):
        if not super().validate():
            return False

        if User.query.filter_by(username=self.username.data).first():
            self.username.errors.append('username already exists')
            return False

        return True
