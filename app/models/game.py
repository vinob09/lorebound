from .db import db, environment, SCHEMA


class Game(db.Model):
    __tablename__ = 'games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)

    # one to many with Character
    characters = db.relationship("Character", back_populates="game", passive_deletes=True)
    # one to many with CharacterItem
    items = db.relationship("CharacterItem", back_populates="game", passive_deletes=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }
