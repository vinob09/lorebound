from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, URLField
from wtforms.validators import DataRequired, Length, URL, Optional, ValidationError
from app.models import Note


def title_exists(form, field):
    # Checking if a title exists
    title = field.data
    title_exists = Note.query.filter(Note.title == title).first()
    if title_exists:
        raise ValidationError('This title already exists in the database.')


class NoteForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=255), title_exists])
    content = TextAreaField('Content', validators=[Optional()])
    url = URLField('Image URL', validators=[Optional(), URL(require_tld=False), Length(max=100)])
