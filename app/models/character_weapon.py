from .db import db, environment, SCHEMA, add_prefix_for_prod


class CharacterWeapon(db.Model):
    __tablename__ = 'character_weapons'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('characters.id'), ondelete='SET NULL'), nullable=True)
    weapon_name = db.Column(db.String(255))
    dice_pool = db.Column(db.String(50))
    damage = db.Column(db.String(50))
    extra_damage = db.Column(db.String(50))
    armor_piercing = db.Column(db.Integer)
    salvo = db.Column(db.Integer)
    range = db.Column(db.String(50))
    traits = db.Column(db.Text)

    # many to one with Character
    character = db.relationship("Character", back_populates="weapons", passive_deletes=True)


    def to_dict(self):
        return {
            'id': self.id,
            'characterId': self.character_id,
            'weaponName': self.weapon_name,
            'dicePool': self.dice_pool,
            'damage': self.damage,
            'extraDamage': self.extra_damage,
            'armorPiercing': self.armor_piercing,
            'salvo': self.salvo,
            'range': self.range,
            'traits': self.traits
        }
