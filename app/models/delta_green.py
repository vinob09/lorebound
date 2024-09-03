from .db import db, environment, SCHEMA, add_prefix_for_prod

class DeltaGreenCharacter(db.Model):
    __tablename__ = 'delta_green_characters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('characters.id'), ondelete='CASCADE'), nullable=False)
    strength = db.Column(db.Integer)
    constitution = db.Column(db.Integer)
    dexterity = db.Column(db.Integer)
    intelligence = db.Column(db.Integer)
    power = db.Column(db.Integer)
    charisma = db.Column(db.Integer)
    hit_points = db.Column(db.Integer)
    willpower_points = db.Column(db.Integer)
    sanity_points = db.Column(db.Integer)
    breaking_point = db.Column(db.Integer)
    distinguishing_features = db.Column(db.Text)
    motivations_mental_disorders = db.Column(db.Text)
    incidents_sanity_loss = db.Column(db.Text)
    physical_description = db.Column(db.Text)
    bonds = db.Column(db.Text)
    wounds = db.Column(db.Text)
    ailments = db.Column(db.Text)
    personal_details_notes = db.Column(db.Text)

    # many to one with Character
    character = db.relationship("Character", back_populates="delta")

    def to_dict(self):
        return {
            'id': self.id,
            'characterId': self.character_id,
            'strength': self.strength,
            'constitution': self.constitution,
            'dexterity': self.dexterity,
            'intelligence': self.intelligence,
            'power': self.power,
            'charisma': self.charisma,
            'hitPoints': self.hit_points,
            'willpowerPoints': self.willpower_points,
            'sanityPoints': self.sanity_points,
            'breakingPoint': self.breaking_point,
            'distinguishingFeatures': self.distinguishing_features,
            'motivationsMentalDisorders': self.motivations_mental_disorders,
            'incidentsSanityLoss': self.incidents_sanity_loss,
            'physicalDescription': self.physical_description,
            'bonds': self.bonds,
            'wounds': self.wounds,
            'ailments': self.ailments,
            'personalDetailsNotes': self.personal_details_notes
        }
