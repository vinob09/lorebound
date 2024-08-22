from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Notes(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='SET NULL'), nullable=True)
    title = db.Column(db.String(255), nullable=False, unique=True)
    url = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'url': self.url,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
