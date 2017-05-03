from wtforms import Form, SelectField, StringField, SubmitField, validators
from wtforms.widgets import PasswordInput

from app.models import User
from app import TEES


class UserForm(Form):
    cancel = SubmitField('cancel')

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

    choices = [(i, TEES[i]) for i in range(len(TEES))]
    default_tees = SelectField('color', choices=choices, coerce=int)

    def validate(self):
        if not super().validate():
            return False

        if User.query.filter_by(username=self.username).first():
            self.username.errors.append('username already exists')
            return False

        return True
