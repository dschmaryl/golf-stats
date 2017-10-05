from wtforms import BooleanField, Form, IntegerField, SubmitField, validators


class HoleForm(Form):
    cancel = SubmitField('cancel')

    strokes = IntegerField('strokes', [
        validators.InputRequired(message='enter strokes'),
        validators.NumberRange(min=1, max=30, message='invalid strokes')
    ])
    putts = IntegerField('putts', [
        validators.InputRequired(message='enter putts'),
        validators.NumberRange(min=0, max=20, message='invalid # of putts')
    ])
    gir = BooleanField('gir')

    def validate(self):
        if not super().validate():
            return False

        if self.strokes.data <= self.putts.data:
            self.strokes.errors.append('strokes must be greater than putts')
            return False

        if self.gir.data not in [0, 1, None]:
            self.gir.errors.append('use 1 for green in reg, 0 for not')
            return False

        return True
