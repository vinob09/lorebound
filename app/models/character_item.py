from .db import db, environment, SCHEMA, add_prefix_for_prod


class CharacterItem(db.Model):
    __tablename__ = 'character_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('characters.id'), ondelete='CASCADE'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id'), ondelete='CASCADE'), nullable=False)
    item_type = db.Column(db.String(50))
    name = db.Column(db.String(255))
    attributes = db.Column(db.JSON)

    # many to one with Character
    character = db.relationship("Character", back_populates="items")
    # many to one with Game
    game = db.relationship("Game", back_populates="items")


    def to_dict(self):
        return {
            'id': self.id,
            'characterId': self.character_id,
            'gameId': self.game_id,
            'itemType': self.item_type,
            'name': self.name,
            'attributes': self.attributes
        }
