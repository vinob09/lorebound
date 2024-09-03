from .db import db, environment, SCHEMA, add_prefix_for_prod


class CharacterArmor(db.Model):
    __tablename__ = 'character_armory'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('characters.id'), ondelete='SET NULL'), nullable=True)
    armor_name = db.Column(db.String(255))
    armor_rating = db.Column(db.Integer)
    traits = db.Column(db.Text)

    # many to one with Character
    character = db.relationship("Character", back_populates="armory", passive_deletes=True)


    def to_dict(self):
        return {
            'id': self.id,
            'characterId': self.character_id,
            'armorName': self.armor_name,
            'armorRating': self.armor_rating,
            'traits': self.traits
        }
