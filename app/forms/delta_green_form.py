from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, RadioField, TextAreaField, SubmitField, FieldList, FormField, SelectField, HiddenField
from wtforms.validators import DataRequired, Optional, NumberRange, Length
import json

class ItemForm(FlaskForm):
    item_type = HiddenField('Item Type', validators=[DataRequired()])
    name = StringField('Name', validators=[Optional(), Length(max=255)])
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
    skill_level = IntegerField('Skill Level', validators=[Optional()])

class DeltaGreenCharacterForm(FlaskForm):
    # generic character field
    character_name = StringField('Last Name, First Name, Middle Initial', validators=[DataRequired(), Length(max=255)])

    # delta green specific fields
    profession = StringField('Profession', validators=[Optional(), Length(max=50)])
    employer = StringField('Employer', validators=[Optional(), Length(max=100)])
    nationality = StringField('Nationality', validators=[Optional(), Length(max=50)])
    sex = RadioField('Sex', choices=[('M', 'Male'), ('F', 'Female')], validators=[Optional()])
    age_dob = StringField('Age and DOB', validators=[Optional(),Length(max=20)])
    education_occupation_history = TextAreaField('Education and Occupational History', validators=[Optional()])
    strength_score = IntegerField('Strength', validators=[DataRequired(), NumberRange(min=0)])
    strength_x5 = IntegerField('Strength x5', validators=[DataRequired(), NumberRange(min=0)])
    strength_features = StringField('Strength Features', validators=[Optional(), Length(max=50)])
    constitution_score = IntegerField('Constitution', validators=[DataRequired(), NumberRange(min=0)])
    constitution_x5 = IntegerField('Constitution x5', validators=[DataRequired(), NumberRange(min=0)])
    constitution_features = StringField('Constitution Features', validators=[Optional(), Length(max=50)])
    dexterity_score = IntegerField('Dexterity', validators=[DataRequired(), NumberRange(min=0)])
    dexterity_x5 = IntegerField('Dexterity x5', validators=[DataRequired(), NumberRange(min=0)])
    dexterity_features = StringField('Dexterity Features', validators=[Optional(), Length(max=50)])
    intelligence_score = IntegerField('Intelligence', validators=[DataRequired(), NumberRange(min=0)])
    intelligence_x5 = IntegerField('Intelligence x5', validators=[DataRequired(), NumberRange(min=0)])
    intelligence_features = StringField('Intelligence Features', validators=[Optional(), Length(max=50)])
    power_score = IntegerField('Power', validators=[DataRequired(), NumberRange(min=0)])
    power_x5 = IntegerField('Power x5', validators=[DataRequired(), NumberRange(min=0)])
    power_features = StringField('Power Features', validators=[Optional(), Length(max=50)])
    charisma_score = IntegerField('Charisma', validators=[DataRequired(), NumberRange(min=0)])
    charisma_x5 = IntegerField('Charisma x5', validators=[DataRequired(), NumberRange(min=0)])
    charisma_features = StringField('Charisma Features', validators=[Optional(), Length(max=50)])
    hit_points_maximum = IntegerField('Hit Points Maximum', validators=[DataRequired(), NumberRange(min=0)])
    hit_points_current = IntegerField('Hit Points Current', validators=[Optional(), NumberRange(min=0)])
    willpower_points_maximum = IntegerField('Willpower Points Maximum', validators=[DataRequired(), NumberRange(min=0)])
    willpower_points_current = IntegerField('Willpower Points Current', validators=[Optional(), NumberRange(min=0)])
    sanity_points_maximum = IntegerField('Sanity Points Maximum', validators=[DataRequired(), NumberRange(min=0)])
    sanity_points_current = IntegerField('Sanity Points Current', validators=[Optional(), NumberRange(min=0)])
    breaking_point_maximum = IntegerField('Breaking Point Maximum', validators=[DataRequired(), NumberRange(min=0)])
    breaking_point_current = IntegerField('Breaking Point Current', validators=[Optional(), NumberRange(min=0)])
    physical_description = TextAreaField('Physical Description', validators=[Optional()])
    bonds = TextAreaField('Bonds', validators=[Optional()])
    bonds_score = IntegerField('Bonds Score', validators=[Optional()])
    motivations_mental_disorders = TextAreaField('Motivations and Mental Disorders', validators=[Optional()])
    incidents_violence = IntegerField('Incidents of Sanity Loss - Violence', validators=[Optional(), Length(max=3)])
    incidents_helplessness = IntegerField('Incidents of Sanity Loss - Helplessness', validators=[Optional(), Length(max=3)])
    wounds_ailments = TextAreaField('Wounds and Ailments', validators=[Optional()])
    personal_details_notes = TextAreaField('Personal Details and Notes', validators=[Optional()])
    developments_home_family = TextAreaField('Developments Which Affect Home and Family', validators=[Optional()])
    special_training = TextAreaField('Special Training', validators=[Optional()])
    skill_stat_used = TextAreaField('Skill or Stat Used', validators=[Optional()])

    items = FieldList(FormField(ItemForm), min_entries=1)
    skills = FieldList(FormField(SkillForm), min_entries=1)

    submit = SubmitField('Create Delta Green Character')
