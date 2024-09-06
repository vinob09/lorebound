from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone


class Character(db.Model):
    __tablename__ = 'characters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id'), ondelete='SET NULL'), nullable=True)
    player_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='SET NULL'), nullable=True)
    character_name = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    # many to one with Game
    game = db.relationship("Game", back_populates="characters")
    # many to one with User
    user = db.relationship("User", back_populates="characters")
    # one to many with CharacterSkill
    skills = db.relationship("CharacterSkill", back_populates="character", cascade="all, delete-orphan")
    # one to many with DeltaGreen
    delta_green_character = db.relationship("DeltaGreenCharacter", back_populates="character", uselist=False, cascade="all, delete-orphan")
    # one to many with DeltaWeapon
    weapons = db.relationship("DeltaWeapon", back_populates="character", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'gameId': self.game_id,
            'playerId': self.player_id,
            'characterName': self.character_name,
            'url': self.url,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
