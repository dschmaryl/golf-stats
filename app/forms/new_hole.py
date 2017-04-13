from wtforms import Form, IntegerField, SubmitField, validators


class NewHoleForm(Form):
    score = IntegerField('score', [
        validators.InputRequired(message='enter score'),
        validators.NumberRange(min=1, max=30, message='invalid score')
        ])
    putts = IntegerField('putts', [
        validators.InputRequired(message='enter putts'),
        validators.NumberRange(min=0, max=20, message='invalid # of putts')
        ])
    gir = IntegerField('gir', [validators.Optional()])

    cancel = SubmitField('cancel')

    def validate(self):
        if not super().validate():
            return False

        if self.score.data <= self.putts.data:
            self.score.errors.append('score must be greater than putts')
            return False

        if self.gir.data not in [0, 1, None]:
            self.gir.errors.append('use 1 for green in reg, 0 for not')
            return False

        return True
