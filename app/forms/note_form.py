from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from flask_wtf.file import FileField, FileAllowed
from wtforms.validators import DataRequired, Length, Optional
from app.models import Note
from app.api.aws_boto import ALLOWED_EXTENSIONS



class NoteForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=255)])
    content = TextAreaField('Content', validators=[Optional()])
    url = FileField('Image File', validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Note")
