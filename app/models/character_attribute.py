from .db import db, environment, SCHEMA, add_prefix_for_prod

class CharacterAttribute(db.Model):
    __tablename__ = 'character_attributes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('characters.id'), ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(255))
    value = db.Column(db.Integer)
    additional_info = db.Column(db.Text)
    game_type = db.Column(db.String(50))

    # many to one with Character
    character = db.relationship("Character", back_populates="attributes")

    def to_dict(self):
        return {
            'id': self.id,
            'characterId': self.character_id,
            'name': self.name,
            'value': self.value,
            'additionalInfo': self.additional_info,
            'gameType': self.game_type
        }
