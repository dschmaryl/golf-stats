from wtforms import Form, IntegerField, SubmitField, validators


class NewHoleForm(Form):
    score = IntegerField('score', [
        validators.DataRequired(message='enter score')
        ])
    putts = IntegerField('putts', [
        validators.DataRequired(message='enter putts')
        ])
    gir = IntegerField('gir', [validators.Optional()])
    cancel = SubmitField('cancel')
