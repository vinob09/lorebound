from .db import db, environment, SCHEMA, add_prefix_for_prod

class Skill(db.Model):
    __tablename__ = 'skills'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    base_value = db.Column(db.Integer, default=0)
    game_type = db.Column(db.String(50))

    # one to many with CharacterSkill
    character_skills = db.relationship("CharacterSkill", back_populates="skill")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'baseValue': self.base_value,
            'gameType': self.game_type
        }
