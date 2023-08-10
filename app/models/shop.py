from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from datetime import datetime


class Shop(db.Model):
    __tablename__ = 'shops'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), unique=True)
    description = db.Column(db.String, nullable=True)
    shop_img = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # one-to-many
    user =db.relationship('User', back_populates='shop')
    products = db.relationship('Product', back_populates='shop', cascade='all, delete-orphan')



    def to_dict(self):
        shop_dict = {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'description':self.description,
            'shop_img':self.shop_img,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
        return shop_dict
