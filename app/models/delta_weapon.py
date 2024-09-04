from .db import db, environment, SCHEMA, add_prefix_for_prod

class DeltaWeapon(db.Model):
    __tablename__ = 'delta_weapons'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('characters.id'), ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(50))
    skill_percentage = db.Column(db.Float)
    base_range = db.Column(db.Float)
    damage = db.Column(db.Float)
    armor_piercing = db.Column(db.String)
    lethality = db.Column(db.Float)
    kill_radius = db.Column(db.Float)
    ammo = db.Column(db.Integer)

    # many to one with Character
    character = db.relationship("Character", back_populates="weapons")

    def to_dict(self):
        return {
            'id': self.id,
            'characterId': self.character_id,
            'name': self.name,
            'skillPrecentage': self.skill_percentage,
            'baseRange': self.base_range,
            'damage': self.damage,
            'armorPiercing': self.armor_piercing,
            'lethality': self.lethality,
            'killRadius': self.kill_radius,
            'ammo': self.ammo
        }
