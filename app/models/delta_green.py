from .db import db, environment, SCHEMA, add_prefix_for_prod
import json

class DeltaGreenCharacter(db.Model):
    __tablename__ = 'delta_green_characters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('characters.id'), ondelete='CASCADE'), nullable=False)

    # personal data
    profession = db.Column(db.String(50))
    employer = db.Column(db.String(100))
    nationality = db.Column(db.String(50))
    sex = db.Column(db.String())
    age_dob = db.Column(db.String(20))
    education_occupation_history = db.Column(db.Text)

    # statistical data
    strength_score = db.Column(db.Integer)
    strength_x5 = db.Column(db.Integer)
    strength_features = db.Column(db.String(50))
    constitution_score = db.Column(db.Integer)
    constitution_x5 = db.Column(db.Integer)
    constitution_features = db.Column(db.String(50))
    dexterity_score = db.Column(db.Integer)
    dexterity_x5 = db.Column(db.Integer)
    dexterity_features = db.Column(db.String(50))
    intelligence_score = db.Column(db.Integer)
    intelligence_x5 = db.Column(db.Integer)
    intelligence_features = db.Column(db.String(50))
    power_score = db.Column(db.Integer)
    power_x5 = db.Column(db.Integer)
    power_features = db.Column(db.String(50))
    charisma_score = db.Column(db.Integer)
    charisma_x5 = db.Column(db.Integer)
    charisma_features = db.Column(db.String(50))

    # derived attributes
    hit_points_maximum = db.Column(db.Integer)
    hit_points_current = db.Column(db.Integer)
    willpower_points_maximum = db.Column(db.Integer)
    willpower_points_current = db.Column(db.Integer)
    sanity_points_maximum = db.Column(db.Integer)
    sanity_points_current = db.Column(db.Integer)
    breaking_point_maximum = db.Column(db.Integer)
    breaking_point_current = db.Column(db.Integer)
    physical_description = db.Column(db.Text)

    # psychological data
    bonds = db.Column(db.Text)
    bonds_score = db.Column(db.Text)
    motivations_mental_disorders = db.Column(db.Text)
    incidents_violence = db.Column(db.Integer)
    incidents_helplessness = db.Column(db.Integer)

    # injuries
    wounds_ailments = db.Column(db.Text)

    # armor and gear
    armor_gear = db.Column(db.Text)

    # remarks
    personal_details_notes = db.Column(db.Text)
    developments_home_family = db.Column(db.Text)
    special_training = db.Column(db.Text)
    skill_stat_used = db.Column(db.Text)

    # many to one with Character
    character = db.relationship("Character", back_populates="delta_green_character")

    def to_dict(self):
        return {
            'id': self.id,
            'characterId': self.character_id,
            'profession': self.profession,
            'employer': self.employer,
            'nationality': self.nationality,
            'sex': self.sex,
            'ageDOB': self.age_dob,
            'educationOccupation': self.education_occupation_history,
            'strengthScore': self.strength_score,
            'strengthx5': self.strength_x5,
            'strengthFeatures': self.strength_features,
            'constitutionScore': self.constitution_score,
            'constitutionx5': self.constitution_x5,
            'constitutionFeatures': self.constitution_features,
            'dexterityScore': self.dexterity_score,
            'dexterityx5': self.dexterity_x5,
            'dexterityFeatures': self.dexterity_features,
            'intelligenceScore': self.intelligence_score,
            'intelligencex5': self.intelligence_x5,
            'intelligenceFeatures': self.intelligence_features,
            'powerScore': self.power_score,
            'powerx5': self.power_x5,
            'powerFeatures': self.power_features,
            'charismaScore': self.charisma_score,
            'charismax5': self.charisma_x5,
            'charismaFeatures': self.charisma_features,
            'hitPointsMaximum': self.hit_points_maximum,
            'hitPointsCurrent': self.hit_points_current,
            'willpowerPointsMaximum': self.willpower_points_maximum,
            'willpowerPointsCurrent': self.willpower_points_current,
            'sanityPointsMaximum': self.sanity_points_maximum,
            'sanityPointsCurrent': self.sanity_points_current,
            'breakingPointMaximum': self.breaking_point_maximum,
            'breakingPointCurrent': self.breaking_point_current,
            'physicalDescription': self.physical_description,
            'bonds': json.loads(self.bonds) if self.bonds else [],
            'bondsScore': json.loads(self.bonds_scores) if self.bonds_scores else [],
            'motivationsMentalDisorders': self.motivations_mental_disorders,
            'incidentsViolence': self.incidents_violence,
            'incidentsHelplessness': self.incidents_helplessness,
            'woundsAilments': self.wounds_ailments,
            'armorGear': self.armor_gear,
            'personalDetailsNotes': self.personal_details_notes,
            'developmentHomeFamily': self.developments_home_family,
            'specialTraining': self.special_training,
            'skillStatUsed': self.skill_stat_used
        }
