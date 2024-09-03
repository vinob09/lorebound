from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField, FieldList, FormField, SelectField, HiddenField
from wtforms.validators import DataRequired, Optional, NumberRange, Length
import json

class ItemForm(FlaskForm):
    item_type = HiddenField('Item Type', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired(), Length(max=255)])
    attributes = TextAreaField('Attributes', validators=[Optional()])

    def validate(self):
        """Custom validation based on item type."""
        initial_validation = super(ItemForm, self).validate()
        if not initial_validation:
            return False

        try:
            json.loads(self.attributes.data)
        except ValueError:
            self.attributes.errors.append('Attributes must be a valid JSON string.')
            return False

        return True

class SkillForm(FlaskForm):
    skill_id = SelectField('Skill', coerce=int, validators=[DataRequired()])
    skill_level = IntegerField('Skill Level', validators=[DataRequired(), NumberRange(min=0)])

class DeltaGreenCharacterForm(FlaskForm):
    character_name = StringField('Character Name', validators=[DataRequired(), Length(max=255)])
    background = TextAreaField('Background', validators=[Optional()])

    # Delta Green specific fields
    strength = IntegerField('Strength', validators=[DataRequired(), NumberRange(min=0)])
    constitution = IntegerField('Constitution', validators=[DataRequired(), NumberRange(min=0)])
    dexterity = IntegerField('Dexterity', validators=[DataRequired(), NumberRange(min=0)])
    intelligence = IntegerField('Intelligence', validators=[DataRequired(), NumberRange(min=0)])
    power = IntegerField('Power', validators=[DataRequired(), NumberRange(min=0)])
    charisma = IntegerField('Charisma', validators=[DataRequired(), NumberRange(min=0)])
    hit_points = IntegerField('Hit Points', validators=[DataRequired(), NumberRange(min=0)])
    willpower_points = IntegerField('Willpower Points', validators=[DataRequired(), NumberRange(min=0)])
    sanity_points = IntegerField('Sanity Points', validators=[DataRequired(), NumberRange(min=0)])
    breaking_point = IntegerField('Breaking Point', validators=[DataRequired(), NumberRange(min=0)])
    distinguishing_features = TextAreaField('Distinguishing Features', validators=[Optional()])
    motivations_mental_disorders = TextAreaField('Motivations/Mental Disorders', validators=[Optional()])
    incidents_sanity_loss = TextAreaField('Incidents of Sanity Loss', validators=[Optional()])
    physical_description = TextAreaField('Physical Description', validators=[Optional()])
    bonds = TextAreaField('Bonds', validators=[Optional()])
    wounds = TextAreaField('Wounds', validators=[Optional()])
    ailments = TextAreaField('Ailments', validators=[Optional()])
    personal_details_notes = TextAreaField('Personal Details/Notes', validators=[Optional()])

    items = FieldList(FormField(ItemForm), min_entries=1)
    skills = FieldList(FormField(SkillForm), min_entries=1)

    submit = SubmitField('Create Delta Green Character')
