from .db import db, environment, SCHEMA, add_prefix_for_prod


class CharacterSkill(db.Model):
    __tablename__ = 'character_skills'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('characters.id'), ondelete='CASCADE'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('skills.id'), ondelete='CASCADE'), nullable=False)
    skill_level = db.Column(db.Integer, default=0)

    # many to one with Character
    character = db.relationship("Character", back_populates="skills")
    # many to one with Skill
    skill = db.relationship("Skill", back_populates="character_skills")

    def to_dict(self):
        return {
            'id': self.id,
            'characterId': self.character_id,
            'skillId': self.skill_id,
            'skillLevel': self.skill_level
        }
