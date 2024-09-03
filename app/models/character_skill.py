from .db import db, environment, SCHEMA, add_prefix_for_prod


class CharacterSkill(db.Model):
    __tablename__ = 'character_skills'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('characters.id'), ondelete='SET NULL'), nullable=True)
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id'), ondelete='SET NULL'), nullable=True)
    skill_name = db.Column(db.String(255), nullable=False)
    skill_level = db.Column(db.Integer)

    # many to one with Character
    character = db.relationship("Character", back_populates="skills", passive_deletes=True)
    # many to one with Game
    game = db.relationship("Game", back_populates="skills", passive_deletes=True)

    def to_dict(self):
        return {
            'id': self.id,
            'characterId': self.character_id,
            'gameId': self.game_id,
            'skillName': self.skill_name,
            'skillLevel': self.skill_level
        }
